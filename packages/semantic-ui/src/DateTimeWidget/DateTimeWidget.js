/* eslint-disable react/prop-types */
import React from "react";
import { localToUTC, utcToLocal, getDisplayLabel } from "@rjsf/utils";
import { Form } from "semantic-ui-react";
import { getSemanticProps } from "../util";

function DateTimeWidget(props) {
  const {
    id,
    required,
    readonly,
    disabled,
    name,
    label,
    schema,
    uiSchema,
    value,
    onChange,
    onBlur,
    onFocus,
    autofocus,
    options,
    formContext,
    rawErrors = [],
  } = props;
  const semanticProps = getSemanticProps({
    uiSchema,
    schema,
    formContext,
    options,
  });
  const _onChange = ({ target: { value } }) =>
    onChange && onChange(localToUTC(value));
  const _onBlur = () => onBlur && onBlur(id, value);
  const _onFocus = () => onFocus && onFocus(id, value);
  const dateValue = utcToLocal(value);
  const displayLabel = getDisplayLabel(
    schema,
    uiSchema
    /* TODO: , rootSchema */
  );
  return (
    <Form.Input
      key={id}
      id={id}
      type="datetime-local"
      label={displayLabel ? label || schema.title : false}
      required={required}
      autoFocus={autofocus}
      disabled={disabled || readonly}
      name={name}
      {...semanticProps}
      value={dateValue}
      error={rawErrors.length > 0}
      onChange={_onChange}
      onBlur={_onBlur}
      onFocus={_onFocus}
    />
  );
}
export default DateTimeWidget;
