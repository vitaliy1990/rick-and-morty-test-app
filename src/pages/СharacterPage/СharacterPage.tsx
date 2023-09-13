import React, { FC, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import css from './СharacterPage.module.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearCharacterProfile, fetchCharacter, selectCharacter, selectError, selectIsLoading } from './СharacterPageSlice';
import Loader from '../../components/Loader/Loader';
import СharacterCard from '../../components/СharacterCard/СharacterCard';
import Fab from '../../components/Fab/Fab';

const СharacterPage: FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const profile = useAppSelector(selectCharacter);
  const error = useAppSelector(selectError);

  const param = useParams();
  const characterId = param.id;

  useEffect(() => {
    if (characterId) {
      dispatch(fetchCharacter(characterId));
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    return () => {
      dispatch(clearCharacterProfile());
    };
  }, [characterId]);

  if (isLoading) {
    return <Loader />;
  }

  if (!characterId || error) {
    return <Navigate to='/404' />;
  }

  return (
    <div className={css.root}>
      {profile && (
        <СharacterCard
          id={profile.id}
          name={profile.name}
          status={profile.status}
          species={profile.species}
          image={profile.image}
          location={profile.location.name}
          firstEpisodeName={profile.firstEpisodeName}
          size='large'
        />
      )}
      <Fab isDisableDownload />
    </div>
  );
};

export default СharacterPage;
