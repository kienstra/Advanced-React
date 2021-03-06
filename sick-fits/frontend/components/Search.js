import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/client';
import debounce from 'lodash.debounce';
import { resetIdCounter, useCombobox } from 'downshift';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    searchTerms: allProducts(
      where: {
        OR: [
          { name_contains_i: $searchTerm }
          { description_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function Search() {
  const [
    findItems,
    { loading, data, error },
  ] = useLazyQuery(SEARCH_PRODUCTS_QUERY, { fetchPolicy: 'no-cache' });

  const items = data?.searchTerms || [];
  const findItemsButChill = debounce(findItems, 350);

  console.log(data);
  resetIdCounter();
  const {
    inputValue,
    getComboboxProps,
    highlightedIndex,
    getMenuProps,
    getInputProps,
    getItemProps,
  } = useCombobox({
    items,
    onInputValueChange() {
      console.log("Input changed");
      findItemsButChill({
        variables: { searchTerm: inputValue },
      });
    },
    onSelectedItemChange() {
      console.log("Selected item changed");
    },
  });

  console.log(highlightedIndex);

  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: "search",
            placeholder: "Search for an item",
            id: "search",
            className: loading ? "loading" : "",
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {items.map((item, index) => (
          <DropDownItem
            key={item.id}
            {...getItemProps({ item })}
            highlighted={index === highlightedIndex}
          >
            <img
              src={item.photo.image.publicUrlTransformed}
              alt={item.name}
              width="50"
            />
            {item.name}
          </DropDownItem>
        ))}
      </DropDown>
    </SearchStyles>
  );
}
