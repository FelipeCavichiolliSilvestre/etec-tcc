import { useState, createContext } from 'react';
import { useContext } from 'react';
import { useArray } from 'react-hanger';
import { useEffect } from 'react';

const SelectContext = createContext({});

function ProfessorSelectionProvider({ children, professors }) {
  const selection = useArray([]);
  const [query, setQuery] = useState('');

  const totalCount = selection.value.length;
  const selectedCounter = selection.value.reduce(
    (counter, option) => (option.selected ? counter + 1 : counter),
    0
  );
  const isPartiallySelected =
    selectedCounter > 0 && selectedCounter < totalCount;
  const isFullySelected = selectedCounter == totalCount;

  useEffect(() => {
    if (!professors) return;

    selection.setValue(
      professors.map((professor) => ({ ...professor, selected: false }))
    );
  }, [professors]);

  function toggleAll() {
    selection.setValue((professors) =>
      professors.map((professor) => ({
        ...professor,
        selected: isPartiallySelected ? true : !isFullySelected,
      }))
    );
  }

  function makeProfessorSelect({ id, selected }) {
    return () => {
      selection.modifyById(id, {
        selected: !selected,
      });
    };
  }

  function getSelectedOptions() {
    return (
      selection.value
        .filter((u) => u.selected === true)
        // Removing selected property from professors
        // eslint-disable-next-line no-unused-vars
        .map(({ selected, ...professor }) => professor)
    );
  }

  return (
    <SelectContext.Provider
      value={{
        professors: selection.value.filter((professor) =>
          professor.name.toUpperCase().includes(query)
        ),
        isLoading: !professors,
        selectedCounter,
        totalCount,
        isPartiallySelected,
        isFullySelected,
        search: setQuery,
        makeProfessorSelect,
        toggleAll,
        getSelectedOptions,
      }}
    >
      {children}
    </SelectContext.Provider>
  );
}

function useSelection() {
  return useContext(SelectContext);
}

export default ProfessorSelectionProvider;
export { useSelection };
