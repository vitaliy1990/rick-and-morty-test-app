import React, { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import classNames from 'classnames';
import css from './FilterForm.module.css';
import arrowDropDownIcon from '../../assets/icons/arrowDropDownIcon.svg';
import { CheckboxField, FilterFormProps, FormValues, SearchFilterInputs, SelectName } from './types';
import { generateSearchParamsList } from '../../utils/API';
import { filterInputs, selectCheckboxFields } from './const';

const FilterForm: FC<FilterFormProps> = ({ handleSubmitForm }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormValues>({
    /* mode: 'onBlur',
    resolver: customResolver, */
  });

  const [checkboxCheckedName, setCheckboxCheckedName] = useState<SelectName | null>(null);
  const [isOpenSelect, setIsOpenSelect] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const searchParamsList = generateSearchParamsList(data);
    const endpointName = checkboxCheckedName || SelectName.character;
    handleSubmitForm(endpointName, searchParamsList);
    setIsOpenSelect(false);
  };

  const mainLabelClassNames = classNames(css.label, css.mainLabel);

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
          checked={item.name === checkboxCheckedName}
          id={item.name}
          {...register(item.name)}
          onChange={() => {
            setCheckboxCheckedName(item.name);
            reset();
          }}
        />
      </label>
    ));

    return <div className={css.selectInputsWrapper}> {selectFilds} </div>;
  };

  const renderSearchInputs = () => {
    const inputsList =
      checkboxCheckedName &&
      filterInputs[checkboxCheckedName].map((input: SearchFilterInputs) => {
        const className = input.id === 1 ? mainLabelClassNames : css.label;
        return (
          <input
            key={input.id}
            type='text'
            {...register(input.name)}
            className={className}
            placeholder={input.placeholder}
          />
        );
      });

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
          {checkboxCheckedName ? (
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
          disabled={!isDirty}
        >
          FIND
        </button>
      </form>
    </div>
  );
};

export default FilterForm;
