import React, { FC, useCallback, useEffect, useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import css from './MainPage.module.css';
import Loader from '../../components/Loader/Loader';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchCharacters, selectIsLoading, selectCharacters, selectError, resetMainState, fetchCharactersByFilter } from './MainPageSlice';
import СharacterCard from '../../components/СharacterCard/СharacterCard';
import { Character, FilterDataObject, SelectName } from '../../types';
import Fab from '../../components/Fab/Fab';
import Pagination from '../../components/Pagination/Pagination';
import Filter from '../../components/Filter/Filter';
import { clearSerchItemsFromLocalStorage, setSearchDataInLocalStorage } from '../../utils/browser';

const MainPage: FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const charactersList = useAppSelector(selectCharacters);
  const error = useAppSelector(selectError);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(searchParams.get('page') || 1);

  useEffect(() => {
    const unuseParam = searchParams.has('location') || searchParams.has('episode');
    if (unuseParam) {
      navigate('/');
    }
  }, []);

  const generateFilterData = useCallback(() => {
    const data: FilterDataObject = {
      character: [],
      location: [],
      episodes: [],
    };

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of searchParams.entries()) {
      if (key === 'episodeName') {
        data.episodes = [...data.episodes, ['name', value]];
      } else if (key === 'locationName') {
        data.location = [...data.location, ['name', value]];
      } else if (key === 'locationType') {
        data.location = [...data.location, ['type', value]];
      } else if (key === 'dimension') {
        data.location = [...data.location, ['dimension', value]];
      } else {
        data.character = [...data.character, [key, value]];
      }
    }

    return data;
  }, [searchParams]);

  useEffect(() => {
    const isLocationParams = searchParams.has('locationName') || searchParams.has('locationType') || searchParams.has('dimension');
    const isEpisodeParams = searchParams.has('episodeName');
    const filterData = generateFilterData();

    if (isLocationParams || isEpisodeParams) {
      dispatch(fetchCharactersByFilter(filterData));
    } else {
      dispatch(fetchCharacters(searchParams.toString()));
    }

    clearSerchItemsFromLocalStorage();
    setSearchDataInLocalStorage(filterData);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    return () => {
      dispatch(resetMainState());
    };
  }, [searchParams]);

  if (error) {
    return (
      <Navigate
        to='/404'
        state={{ message: `There are no search matches...` }}
      />
    );
  }

  if (isLoading || !charactersList) {
    return <Loader />;
  }

  const handleSubmit = (endpoint: Array<SelectName>, params: [string, string][]) => {
    const isLocationOrEpisode = endpoint.includes(SelectName.location) || endpoint.includes(SelectName.episodes);

    if (isLocationOrEpisode) {
      const filterInputsValues = Object.fromEntries(params);
      setSearchParams({ ...filterInputsValues });
    }

    if (endpoint.includes(SelectName.character)) {
      const filterInputsValues = Object.fromEntries(params);
      setPageNumber('1');
      setSearchParams({ ...filterInputsValues });
    }
  };

  const renderCharactersSection = () =>
    charactersList?.results?.map((character: Character) => (
      <СharacterCard
        key={character.id}
        id={character.id}
        name={character.name}
        status={character.status}
        species={character.species}
        image={character.image}
        location={character.location.name}
        firstEpisodeName={character.firstEpisodeName}
      />
    ));

  const handleClickPage = (pagePointNumber: number) => {
    const currentParams = Object.fromEntries(searchParams.entries());
    const page = `${pagePointNumber}`;
    setSearchParams({ ...currentParams, page });
    setPageNumber(pagePointNumber);
  };

  const renderEmptySearch = () => {
    const isSearchParamsComplate = !!searchParams.size;
    const isSearchFindCharacters = !!charactersList?.results.length;

    if (isSearchParamsComplate && !isSearchFindCharacters) {
      return (
        <div>
          <h3>There are no search matches...</h3>
        </div>
      );
    }

    return null;
  };

  return (
    <div className={css.root}>
      <Filter handleSubmit={handleSubmit} />
      <div className={css.charactersWrapper}>{renderCharactersSection()}</div>
      {renderEmptySearch()}
      <Fab />
      <Pagination
        pagesCount={charactersList?.info?.pages}
        handleClickPage={handleClickPage}
        currentPage={+pageNumber}
        pageSize={6}
        className={css.pagination}
      />
    </div>
  );
};

export default MainPage;
