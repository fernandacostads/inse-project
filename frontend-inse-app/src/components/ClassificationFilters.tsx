import CollapsibleList from 'components/CollapsibleList';
import { getUniqueValues } from 'core/utils';
import { useState } from 'react';
import { useItems } from 'core/hooks';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { useSearchParams } from 'react-router-dom';
import FilterToggle from 'components/FilterToggle';
import { School } from 'core/types';

export default function ClassificationFilters() {
  const [search, setSearch] = useSearchParams();
  const filteredClassifications = search.get('classifications')?.split(',') ?? [];
  const [classifications, setClassifications] = useState(filteredClassifications);
  const getItems = useItems();
  const items = getItems.data?.schools ?? [];
  const allClassifications = getUniqueValues<string, School>(items, 'classification');
  const groupedItems = allClassifications
    .map((classification) => ({
      label: classification,
      name: classification,
      value: classification,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
  const onClassificationChange = (classification: string) => (checked: Checkbox.CheckedState) => {
    let _classifications = classifications.slice();

    if (checked) {
      _classifications.push(classification);
    } else {
      _classifications = _classifications.filter((_classification) => _classification !== classification);
    }

    setClassifications(_classifications);
  };
  const hasFilters = filteredClassifications.length > 0;

  return (
    <CollapsibleList
      defaultVisible={hasFilters}
      title="Classificação"
      actionButton={
        <FilterToggle
          visible={classifications.length > 0}
          active={hasFilters}
          onApply={() => {
            search.set('classifications', classifications.join(','));
            setSearch(search, {
              replace: true,
            });
          }}
          onClear={() => {
            search.delete('classifications');
            setClassifications([]);
            setSearch(search, {
              replace: true,
            });
          }}
        />
      }
    >
      {groupedItems
        .filter((f) => {
          if (filteredClassifications.length === 0) {
            return true;
          }

          return filteredClassifications.includes(f.value);
        })
        .map((field, key) => (
          <li key={key} className="pv2">
            <div className="flex items-center">
              <Checkbox.Root
                id={field.name}
                name={field.name}
                disabled={hasFilters}
                onCheckedChange={onClassificationChange(field.value)}
                checked={classifications.includes(field.value)}
                className="checkbox lh-solid flex items-center justify-center pa0 bg-white w125 h125 br2 bn"
              >
                <Checkbox.Indicator>
                  <CheckIcon className="checkbox__icon w125 h125" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <label htmlFor={field.name} className="ml3 fw5 f5">
                {field.label}
              </label>
            </div>
          </li>
        ))}
    </CollapsibleList>
  );
}
