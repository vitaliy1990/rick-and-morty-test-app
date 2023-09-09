import React, { FC, useEffect, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import css from './MainPage.module.css';
import Loader from '../../components/Loader/Loader';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchCharacters, selectIsLoading, selectCharacters, selectError, clearCharacters } from './MainPageSlice';
import СharacterCard from '../../components/СharacterCard/СharacterCard';
import { Character } from '../../types';
import Fab from '../../components/Fab/Fab';

const MainPage: FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const charactersList = useAppSelector(selectCharacters);
  const error = useAppSelector(selectError);

  const [pageNumber, setPageNimber] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    dispatch(fetchCharacters(1));

    return () => {
      dispatch(clearCharacters());
    };
  }, []);

  if (error) {
    return <Navigate to='/404' />;
  }

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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={css.root}>
      <div>
        <button
          type='button'
          className={css.filterButton}
        >
          Filter
        </button>
      </div>
      <div className={css.charactersWrapper}>{renderCharactersSection()}</div>
      <Fab />
    </div>
  );
};

export default MainPage;
