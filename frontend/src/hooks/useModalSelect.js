import { useState } from 'react';

function useModalSelect() {
  const [selectedValue, setSelectedValue] = useState();
  const open = Boolean(selectedValue);

  function removeSelect() {
    setSelectedValue(null);
  }

  function select(value) {
    setSelectedValue(value);
  }

  function registerModal() {
    return {
      open,
      onClose: removeSelect,
      value: selectedValue,
    };
  }

  return {
    select,
    registerModal,
  };
}

export default useModalSelect;
