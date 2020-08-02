import React from 'react';
import App from './App';
//import Dashboard from './Components/Dashboard';
import { AgGridReact } from 'ag-grid-react';
import { mount } from 'enzyme';

jest.spyOn(console, 'error').mockImplementation(() => { });
jest.spyOn(console, 'warn').mockImplementation(() => { });

const testData = [
  {
    TicketID: '3',
    Type: 'Epic',
    Summary: 'Dashboard View',
    Status: 'In progress',
    CreatedDate: '09/Jul/19'
  },
  {
    TicketID: '5',
    Type: 'Story',
    Summary: 'Multiple API calls to fetch items for dashboard view',
    Status: 'Done',
    CreatedDate: '16/Jul/19'
  },
  {
    TicketID: '15',
    Type: 'Bug',
    Summary: 'UI doesn\'t waits for all API calls to return a response before moving to next steps',
    Status: 'Ready for Dev',
    CreatedDate: '18/Jul/19'
  },
  {
    TicketID: '17',
    Type: 'Story',
    Summary: 'Sort the dashboard items based on criticality',
    Status: 'Done',
    CreatedDate: '17/Nov/19'
  },
  {
    TicketID: '34',
    Type: 'Bug',
    Summary: 'Dashboard UI sorts numbers as String - 100 and 111 listed before 2 and 22',
    Status: 'Ready for Dev',
    CreatedDate: '22/Jul/19'
  },
  {
    TicketID: '9',
    Type: 'Story',
    Summary: 'Apply locale specific language translation to dashboard items',
    Status: 'In progress',
    CreatedDate: '20/Jul/19'
  },
  {
    TicketID: '10',
    Type: 'Story',
    Summary: 'Apply appropriate color scheme to dashboard items based on criticality',
    Status: 'Ready for Dev',
    CreatedDate: '20/Jul/19'
  }
];

const setRowData = (wrapper, rowData) => {
  return new Promise(function (resolve, reject) {
    wrapper.setState({ rowData }, () => {
      wrapper.update();
      resolve();
    });
  })
}

const ensureGridApiHasBeenSet = (wrapper) => {
  return new Promise(function (resolve, reject) {
    (function waitForGridReady() {
      if (wrapper.instance().gridApi) {
        resolve(wrapper);
        return;
      }
      setTimeout(waitForGridReady, 100);
    })();
  });
};

describe('Grid Actions Panel', () => {
  let wrapper = null;
  let agGridReact = null;

  beforeEach((done) => {
    wrapper = mount(<App />);
    agGridReact = wrapper.find(AgGridReact).instance();

    ensureGridApiHasBeenSet(wrapper)
      .then(() => setRowData(wrapper, testData))
      .then(() => done());
  });

  afterEach(() => {
    wrapper.unmount();
    wrapper = null;
    agGridReact = null;
  })

  it('renders without crashing', () => {
    expect(wrapper.find('.App').exists()).toBeTruthy();
  });

  it('renders test rows', () => {
    const gridRows = wrapper.render().find('.ag-center-cols-container .ag-row');
    const columns = wrapper.render().find('.ag-header-cell');
    for (let i = 0; i < gridRows.length; i++) {
      for (let j = 0; j < columns.length; j++) {
        const colId = gridRows[i].children[j].attribs['col-id'];
        const cellText = gridRows[i].children[j].children[0].data;
        const testValue = testData[i][colId].toString();
        expect(cellText).toEqual(testValue);
      }
    }
    // 2) Using ag-Grid's API
    agGridReact.api.forEachNode((node, nodeInd) => {
      Object.keys(node.data).forEach(colId => {
        const cellValue = node.data[colId];
        const testValue = testData[nodeInd][colId];
        expect(cellValue).toEqual(testValue);
      })
    });
  });

  // it('Sorts by createdDate: descending', () => {
  //   const sortedDescTestData = testData.sort((a, b) => b.createdDate - a.createdDate);
  //   wrapper.find('#sortBycreatedDateDesc').simulate('click');

  //   // 1) querying JSDOM
  //   const gridRows = wrapper.render().find('.ag-center-cols-container .ag-row');
  //   for (let i = 0; i < gridRows.length; i++) {
  //     const cellText = gridRows[i].children[2].children[0].data;
  //     const testValue = testData[i]['createdDate'].toString();
  //     expect(cellText).toEqual(testValue);
  //   }
  //   // 2) using the grid API
  //   agGridReact.api.forEachNodeAfterFilterAndSort((node, ind) => {
  //     expect(node.data.createdDate).toEqual(sortedDescTestData[ind].price);
  //   });
  // })

})


