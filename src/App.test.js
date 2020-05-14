import React from 'react';
import App from './App';
import { AgGridReact } from 'ag-grid-react';

import { mount } from 'enzyme';


describe('Testing a grid of rowModelType="serverSide"', () => {
	let component = null;

	beforeEach(() => {
		// ignore license errors 
		jest.spyOn(console, 'error').mockImplementation(() => { });
		component = mount(<App />);
	});

	afterEach(() => {
		component.unmount();
	})

	it('renders dummy row when response is successful', (done) => {
		let dummyRow = [{ athlete: 'Ipsum Lorem Dolor' }];

		component.instance().initializeData = jest.fn(params => {
			let successDataSource = {
				getRows: params => {
					params.successCallback([dummyRow], 1);
				}
			}
			component.find(AgGridReact).instance().api.setServerSideDatasource(successDataSource);
		});

		component.update();
		// component.instance().updateData();

		setTimeout(() => {
			let firstNode = component.instance().gridApi.getDisplayedRowAtIndex(0);
			expect(firstNode.data.athlete).toEqual(dummyRow.athlete);
			done();
		}, 1000);
	});

	it('fails gracefully when response fails', (done) => {
		component.instance().initializeData = jest.fn(params => {
			let failDataSource = {
				getRows: params => {
					params.failCallback();
				}
			};
			component.find(AgGridReact).instance().api.setServerSideDatasource(failDataSource);
		});

		component.update();
		// component.instance().updateData();

		setTimeout(() => {
			let pageStatus = component.instance().gridApi.getCacheBlockState()[0].pageStatus;
			expect(pageStatus).toEqual('failed');
			done();
		}, 1000);

	});


})