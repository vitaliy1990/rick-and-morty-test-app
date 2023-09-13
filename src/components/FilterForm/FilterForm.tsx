import React, { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import classNames from 'classnames';
import css from './FilterForm.module.css';
import arrowDropDownIcon from '../../assets/icons/arrowDropDownIcon.svg';
import { CheckboxField, FilterFormProps, FormFilterValues, SearchFilterInputs } from './types';
import { generateSearchParamsList } from '../../utils/API';
import { fieldValidValues, filterInputs, selectCheckboxFields } from './const';
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

  const [checkboxCheckedName, setCheckboxCheckedName] = useState<SelectName | null>(null);
  const [isOpenSelect, setIsOpenSelect] = useState<boolean>(false);

  const resetForm = () => {
    reset();
    setIsOpenSelect(false);
    setCheckboxCheckedName(null);
  };

  const onSubmit: SubmitHandler<FormFilterValues> = (data) => {
    const searchParamsList = generateSearchParamsList(data);
    const endpointName = checkboxCheckedName || SelectName.character;
    resetForm();
    handleSubmitForm(endpointName, searchParamsList);
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
              className={className}
              placeholder={input.placeholder}
            />
            {errors[input.name] && <span className={css.error}>{errorMessage}</span>}
          </div>
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
          disabled={!isDirty || !isValid}
        >
          FIND
        </button>
      </form>
    </div>
  );
};

export default FilterForm;
