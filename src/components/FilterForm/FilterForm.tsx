import React, { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import classNames from 'classnames';
import css from './FilterForm.module.css';
import arrowDropDownIcon from '../../assets/icons/arrowDropDownIcon.svg';
import { CheckboxField, FilterFormProps, FormFilterValues, SearchFilterInputs } from './types';
import { generateSearchParamsList } from '../../utils/API';
import { fieldValidValues, filterInputs } from './const';
import { SelectName } from '../../types';
import { validateFieldValue } from '../../utils/validation';

const FilterForm: FC<FilterFormProps> = ({ handleSubmitForm }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<FormFilterValues>({
    mode: 'onBlur',
  });
  const [isEpisodeChecked, setIsEpisodeChecked] = useState<boolean>(false);
  const [isLocationChecked, setIsLocationChecked] = useState<boolean>(false);
  const [isCharacterChecked, setIsCharacterChecked] = useState<boolean>(false);
  const [isOpenSelect, setIsOpenSelect] = useState<boolean>(false);

  const isCheckedSelect = isEpisodeChecked || isLocationChecked || isCharacterChecked;

  const resetForm = () => {
    reset();
    setIsOpenSelect(false);
    setIsEpisodeChecked(false);
    setIsLocationChecked(false);
    setIsCharacterChecked(false);
  };

  const onSubmit: SubmitHandler<FormFilterValues> = (data) => {
    const searchParamsList = generateSearchParamsList(data);
    const selectNames = [];

    if (isCharacterChecked) selectNames.push(SelectName.character);
    if (isLocationChecked) selectNames.push(SelectName.location);
    if (isEpisodeChecked) selectNames.push(SelectName.episodes);

    const endpointsName = selectNames.length ? selectNames : [SelectName.character];

    resetForm();
    handleSubmitForm(endpointsName, searchParamsList);
  };

  const mainLabelClassNames = classNames(css.label, css.mainLabel);

  const handleChangeCheckbox = (selectName: SelectName) => {
    switch (selectName) {
      case SelectName.location:
        setIsLocationChecked((prevState) => !prevState);
        break;
      case SelectName.episodes:
        setIsEpisodeChecked((prevState) => !prevState);
        break;
      default:
        setIsCharacterChecked((prevState) => !prevState);
    }

    reset();
  };

  const selectCheckboxFields: Array<CheckboxField> = [
    {
      id: 1,
      label: 'Character',
      name: SelectName.character,
      isChecked: isCharacterChecked,
    },
    {
      id: 2,
      label: 'Location',
      name: SelectName.location,
      isChecked: isLocationChecked,
    },
    {
      id: 3,
      label: 'Episodes',
      name: SelectName.episodes,
      isChecked: isEpisodeChecked,
    },
  ];

  const renderCheckboxFields = () => {
    const selectFilds = selectCheckboxFields.map((item: CheckboxField) => (
      <label
        htmlFor={item.name}
        className={css.label}
        key={item.id}
      >
        <span>{item.label}</span>
        <input
          key={item.id}
          type='checkbox'
          checked={item.isChecked}
          id={item.name}
          {...register(item.name)}
          onChange={() => handleChangeCheckbox(item.name)}
        />
      </label>
    ));

    return <div className={css.selectInputsWrapper}> {selectFilds} </div>;
  };

  const createInputsBySelecName = (selecName: SelectName) => {
    return filterInputs[selecName].map((input: SearchFilterInputs) => {
      const isValidateField = input.name === 'gender' || input.name === 'status';
      const validate = (values: string) => validateFieldValue(values, input.name);
      const errorMessage = isValidateField && `Please enter one of values: ${fieldValidValues[input.name].join(', ')}`;

      return (
        <div
          className={css.inputWrapper}
          key={input.id}
          data-error={errors[input.name]}
        >
          <input
            type='text'
            {...register(input.name, {
              validate: isValidateField ? validate : {},
            })}
            className={css.label}
            placeholder={input.placeholder}
          />
          {errors[input.name] && <span className={css.error}>{errorMessage}</span>}
        </div>
      );
    });
  };

  const renderSearchInputs = () => {
    const filterInputsCharacter = isCharacterChecked ? createInputsBySelecName(SelectName.character) : [];
    const filterInputsEpisode = isEpisodeChecked ? createInputsBySelecName(SelectName.episodes) : [];
    const filterInputsLocation = isLocationChecked ? createInputsBySelecName(SelectName.location) : [];

    const inputsList = [...filterInputsCharacter, ...filterInputsLocation, ...filterInputsEpisode];

    return <div className={css.searchInputsWrapper}>{inputsList}</div>;
  };

  return (
    <div className={css.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css.selectWrapper}>
          <button
            type='button'
            className={mainLabelClassNames}
            onClick={() => {
              setIsOpenSelect(!isOpenSelect);
            }}
          >
            <p>Select Item</p>
            <img
              src={arrowDropDownIcon}
              alt=''
            />
          </button>
          {isOpenSelect && renderCheckboxFields()}
        </div>
        <div className={css.searchFormWrapper}>
          {isCheckedSelect ? (
            renderSearchInputs()
          ) : (
            <input
              type='text'
              {...register('name')}
              className={mainLabelClassNames}
              placeholder='Add key words to find'
            />
          )}
        </div>
        <button
          type='submit'
          disabled={!isDirty || !isValid}
        >
          FIND
        </button>
      </form>
    </div>
  );
};

export default FilterForm;
