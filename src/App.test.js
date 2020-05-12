import React from 'react';
import App from './App';
import { AgGridReact } from 'ag-grid-react';

import { mount } from 'enzyme';

let component = null;
let agGridReact = null;

// const ensureGridApiHasBeenSet = (component) => {
//   return new Promise(function (resolve, reject) {
//     (function waitForGridReady() {

//       if (component.instance().api) {
//         return resolve();
//       }

//       setTimeout(waitForGridReady, 10);
//     })();
//   });
// };

beforeEach((done) => {
  // ignore license errors 
  jest.spyOn(console, 'error').mockImplementation(() => { });

  // component = mount(<App />);
  // agGridReact = component.find(AgGridReact).instance();
  // ensureGridApiHasBeenSet(component).then(() => done());
  done();
});

afterEach(() => {
  component.unmount();
  agGridReact = null;
})

it('renders rows when response is successful', (done) => {

  let dummyRow = [{
    athlete: 'Michael Phelps',
  }];

  component = mount(<App />);

  component.instance().initializeData = jest.fn(initData)

  function initData(params) {
    console.log('initData')
    let successDataSource = {
      getRows: params => {
        params.successCallback([dummyRow], 1);
      }
    }
    component.find(AgGridReact).instance().api.setServerSideDatasource(successDataSource);
  }

  component.update();

  // component.instance().updateData();

  setTimeout(() => {
    let firstNode = component.instance().gridApi.getDisplayedRowAtIndex(0)
    expect(firstNode.data.athlete).toEqual(dummyRow.athlete);
    done();
  }, 2000);

});

it('fails gracefully when response fails', () => {
  component = mount(<App />);
  // let failDataSource = {
  //   getRows: params => {
  //     params.failCallback();
  //   }
  // };

  // params.api.setServerSideDatasource(failDataSource);
});