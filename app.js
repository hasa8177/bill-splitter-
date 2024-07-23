const elements = 
{
    whoIsSplittingInput: document.getElementById('people-splittng-bill'),
    addPersonBtn: document.getElementById('add-person-btn'),
    listOfPeopleDiv: document.getElementById('list-of-people-div'),
    whoPaid: document.getElementById('who-paid'),
    addItemBtn: document.getElementById('add-item'),
    itemValue: document.getElementById('item'),
    checkboxDiv: document.getElementById('checkbox-div'),
    priceValue: document.getElementById('price'),
    itemInputSection: document.getElementById('item-input-section'),
    allItemsList: document.getElementById('all-items-list'), 
    resultsList: document.getElementById('results-list'),
    totalElement: document.getElementById('total'),
    selectAllDiv: document.getElementById('select-all-div'),
    checkAll: document.getElementById('check-all'),
    resultsNav: document.getElementById('results-nav'),
    userBtns: document.getElementById('user-btns'),
    itemDiv: document.getElementById('item-div'),
}

const allUserData = [];
let total = 0; 

const addPersonSplittingBill = () => {
    if (elements.whoIsSplittingInput.value === '') return;

    const name = elements.whoIsSplittingInput.value

    const personContainer = document.createElement('div');
    personContainer.classList.add('flex', 'person-container');
    personContainer.setAttribute('id', `${name}`);

    const removeBtn = document.createElement('button');
    removeBtn.innerText = 'X';
    removeBtn.setAttribute('onclick', `removePerson('${name}')`);
    personContainer.appendChild(removeBtn);

    const person = document.createElement('p');
    person.innerText = name;
    personContainer.appendChild(person);

    elements.listOfPeopleDiv.appendChild(personContainer);

    allUserData.push({name: name, amountOwed: 0, thingsPurchased: {}})

    elements.whoIsSplittingInput.value = '';

    fillWhoPaidDropDown(name);
    addCheckbox(name);
    createUserBtn(name);

    const singleUserList =  document.createElement('ul');
    singleUserList.setAttribute('id', `${name.toLowerCase()}-items-list`);
    singleUserList.classList.add('hidden');
    elements.itemDiv.appendChild(singleUserList);
    elements[`${name.toLowerCase()}ItemsList`] = singleUserList
}

const fillWhoPaidDropDown = (name) => {
    const option = document.createElement('option');
    option.value = name; 
    option.innerText = name;
    option.setAttribute('id', `${name}-dropdown`);
    elements.whoPaid.appendChild(option) 
}

const addCheckbox = (name) => {
    if (allUserData.length > 1) {
        elements.selectAllDiv.classList.remove('hidden')
    }

    const checkboxContainer = document.createElement('div');
    checkboxContainer.classList.add('flex');
    checkboxContainer.setAttribute('id', `${name}-checkbox-container`)
    
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox')
    input.setAttribute('id', `${name}-checkbox`);
    input.setAttribute('name', `people-to-split-item`);
    
    const label = document.createElement('label');
    label.innerText = name; 
    label.setAttribute('for', `${name}-checkbox`);
    
    checkboxContainer.appendChild(input);
    checkboxContainer.appendChild(label);
    elements.checkboxDiv.appendChild(checkboxContainer);
}

const addItemToSingleUserList = (name, item, price) => {
    const listElement = document.createElement('li');
    listElement.classList.add('flex');

    const div = document.createElement('div');
    div.classList.add('flex');

    const itemElement = document.createElement('span');
    itemElement.innerText = item;
    div.appendChild(itemElement);

    listElement.appendChild(div);
    
    const priceElement = document.createElement('span');
    priceElement.innerText = price; 
    listElement.appendChild(priceElement);
    
    elements[`${name.toLowerCase()}ItemsList`].appendChild(listElement);
}

const addItem = () => {
    if (elements.itemValue.value === '' || elements.priceValue.value === '') return;

    const item = elements.itemValue.value
    const price = elements.priceValue.value

    elements.itemValue.value = '';
    elements.priceValue.value = '';

    peopleSplittingItem = [];

    for (let i = 0; i < allUserData.length; i++) {
        if (document.getElementById(`${allUserData[i].name}-checkbox`).checked) {
            peopleSplittingItem.push(allUserData[i].name)
        }
    }

    const itemCostPerPerson = price / peopleSplittingItem.length;

    for (let i = 0; i < peopleSplittingItem.length; i++) {
        const name = peopleSplittingItem[i]
        for (let j = 0; j < allUserData.length; j++) {
            if (allUserData[j].name === name) {
                allUserData[j].amountOwed += itemCostPerPerson;
                allUserData[j].thingsPurchased[item] = itemCostPerPerson;
            }
        }
    }

    const listElement = document.createElement('li');
    listElement.classList.add('flex');
    listElement.setAttribute('id', `${item}`)

    const div = document.createElement('div');
    div.classList.add('flex');
    
    const removeBtn = document.createElement('button');
    removeBtn.innerText = 'X';
    removeBtn.setAttribute('onclick', `removeItem('${item}')`);
    div.appendChild(removeBtn);

    const itemElement = document.createElement('span');
    itemElement.innerText = item;
    div.appendChild(itemElement);

    listElement.appendChild(div);
    
    const priceElement = document.createElement('span');
    priceElement.innerText = price; 
    listElement.appendChild(priceElement);
    
    elements.allItemsList.appendChild(listElement);

    updateTotal(price);
    
    elements.itemValue.focus();

    for (let name of peopleSplittingItem) {
        addItemToSingleUserList(name, item, itemCostPerPerson);
    }
}

const updateTotal = (price) => {
    total += parseFloat(price); 
    const formattedTotal = total.toFixed(2);
    elements.totalElement.innerText = ''; 
    elements.totalElement.innerText = `$${formattedTotal}`; 
}

const removePerson = (person) => {
    document.getElementById(person).remove();
    document.getElementById(`${person}-dropdown`).remove();
    document.getElementById(`${person}-checkbox-container`).remove();

    for (let i = 0; i < allUserData.length ; i++) {
            if (allUserData[i].name === person ) {
                allUserData.splice(i, 1)
            }
        };

    if (allUserData.length < 2) {
        elements.selectAllDiv.classList.add('hidden')
    }

    const buttons = document.querySelectorAll('#user-btns button')

    for (let button of buttons) {
        if (button.innerText === person) {
            button.remove();
        }
    }
}

const removeItem = (item) => {
    document.getElementById(`${item}`).remove();

    for (let people of allUserData) {
        people.amountOwed -= people.thingsPurchased[item];
        delete people.thingsPurchased[item];
    }
}

const calculate = () => {
    if (elements.totalElement.innerText === '$0') return; 

    elements.resultsList.innerHTML = '';

    const personOwed = elements.whoPaid.value;
    let amountOwedTotal = 0;

    for (let i = 0; i < allUserData.length; i++) {
        if (allUserData[i].name !== personOwed) {
            amountOwedTotal += allUserData[i].amountOwed
        }
    }

    const personOwedElement = document.createElement('p');
    personOwedElement.innerText = `${personOwed} is owed: $${amountOwedTotal.toFixed(2)}`
    elements.resultsList.appendChild(personOwedElement);

    for (let i = 0; i < allUserData.length; i++) {

        if (allUserData[i].name !== personOwed) {
            const name = allUserData[i].name; 
            const owes = allUserData[i].amountOwed;
    
            const owesElement = document.createElement('p');
            owesElement.innerText = `${name} owes $${owes.toFixed(2)}`
    
            elements.resultsList.appendChild(owesElement)
        }
    }
}

const createUserBtn = (name) => {
    const button = document.createElement('button'); 
    button.innerText = name; 
    button.setAttribute('onclick', `viewBreakdown("${name.toLowerCase()}")`);
    button.classList.add('user-btn');
    elements.userBtns.appendChild(button);
}

const viewBreakdown = (name) => {
    const userList = elements[`${name}ItemsList`]
    const allUsers = document.querySelectorAll('#item-div ul');

    for (let users of allUsers) {
        users.classList.add('hidden');
    }

    userList.classList.remove('hidden');
}

elements.whoIsSplittingInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && elements.whoIsSplittingInput.value !== '') addPersonSplittingBill();
})

elements.itemInputSection.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && document.querySelectorAll('#checkbox-div input[type="checkbox"]:checked').length > 1) addItem();
})

elements.checkAll.addEventListener('change', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    
    for (let checkbox of checkboxes) {
        checkbox.checked = elements.checkAll.checked
    }
})

elements.checkboxDiv.addEventListener('change', () => {
    const checkboxes = document.querySelectorAll('#checkbox-div input[type="checkbox"]');

    if (checkboxes.length > 1) {
        let checkedBoolean = document.querySelectorAll('#checkbox-div input[type="checkbox"]:checked').length === checkboxes.length;

        elements.checkAll.checked = checkedBoolean;
    }
})