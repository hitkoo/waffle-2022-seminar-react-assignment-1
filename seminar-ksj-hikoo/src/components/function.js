export const typetotext = (type) => {
    if (type === 'waffle') {
      return '와플'
    } else if (type === 'beverage') {
      return '음료'
    } else if (type === 'coffee') {
      return '커피'
    }
  }

export const FindMenubyID = (menulist, id) => {
  const Index = menulist.findIndex(e => e.id === Number(id))
  return Index
}

export const FindMenubyName = (menulist, name) => {
  const Index = menulist.findIndex(e => e.name === name)
  return Index
}

export const FilterMenu = (menulist, search) => {
  const filteredMenu = menulist.filter((el) => el.name.toString().toLowerCase().indexOf(search.toString().toLowerCase()) > -1)
  return filteredMenu
}

