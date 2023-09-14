import React, { FC, useEffect, useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import css from './MainPage.module.css';
import Loader from '../../components/Loader/Loader';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchCharacters, selectIsLoading, selectCharacters, selectError, fetchCharactersByLocations, fetchCharactersByEpisodes, resetMainState } from './MainPageSlice';
import СharacterCard from '../../components/СharacterCard/СharacterCard';
import { Character, SelectName } from '../../types';
import Fab from '../../components/Fab/Fab';
import Pagination from '../../components/Pagination/Pagination';
import Filter from '../../components/Filter/Filter';
import { generateSearchParams } from '../../utils/API';
import { removeRestItemsLocalStorage, setDataInLocalStorage } from '../../utils/browser';

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

  useEffect(() => {
    const unuseParam = searchParams.has('location') || searchParams.has('episode');

    if (!unuseParam) {
      dispatch(fetchCharacters(searchParams.toString()));
    }

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

  const handleSubmit = (endpoint: SelectName, params: [string, string][]) => {
    const searchData = {
      endpoint,
      params,
    };

    const paramsFilter = generateSearchParams(searchData.params);

    if (endpoint === SelectName.episodes) {
      dispatch(fetchCharactersByEpisodes(paramsFilter));
      setSearchParams({ episode: 'true' });
    }

    if (endpoint === SelectName.location) {
      dispatch(fetchCharactersByLocations(paramsFilter));
      setSearchParams({ location: 'true' });
    }

    if (endpoint === SelectName.character) {
      const filterInputsValues = Object.fromEntries(searchData.params);
      setPageNumber('1');
      setSearchParams({ ...filterInputsValues });
    }

    removeRestItemsLocalStorage(endpoint);
    setDataInLocalStorage(endpoint, params);
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

  return (
    <div className={css.root}>
      <Filter handleSubmit={handleSubmit} />
      <div className={css.charactersWrapper}>{renderCharactersSection()}</div>
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
