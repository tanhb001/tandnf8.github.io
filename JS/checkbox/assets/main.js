let selectedItems = [];

render = () => {
  const checkboxItemElements = document.querySelectorAll('.checkbox-item');
  checkboxItemElements.forEach((element) => {
    const existed = selectedItems.includes(element.value)
    if (existed){
      element.checked = true;
    } else {
      element.checked = false;
    }
  })

  const checkboxAllElement = document.querySelector('.check-all');
  const isActiveAll = Array.from(checkboxItemElements).every((element) => {
    return selectedItems.includes(element.value);
  })

  checkboxAllElement.checked = isActiveAll;
}

render()

handler = () => {
  const checkboxElements = document.querySelectorAll('.checkbox-item')
  checkboxElements.forEach((element) =>{
    element.onchange = (event) => {
      const checked = event.target.checked
      const value = event.target.value
      if (checked) {
        selectedItems.push(value)
      } else {
        selectedItems = selectedItems.filter((item) => {
          return item !== value
        })
      }
      render();
    }
  })

  const checkboxAllElement = document.querySelector('.check-all');
    checkboxAllElement.onchange = (event) => {
      const checked = event.target.checked
      
      if (checked) {
      const selectedAllValues = Array.from(checkboxElements).map((item) => {
          return item.value;
      })
      selectedItems = selectedAllValues;
      } else {
      selectedItems = [];
      }

      render();
    }
}
handler();