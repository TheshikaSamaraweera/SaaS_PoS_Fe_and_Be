const { expect } = require('chai');
const { shallow } = require('enzyme');
const React = require('react');
const UsersPage = require('../src/app/branch-manager/cashier-management/page.tsx');

describe('UsersPage', function() {
  it('should render without crashing', function() {
    const wrapper = shallow(<UsersPage />);
    expect(wrapper.exists()).to.be.true;
  });

  it('should have a DataTable component', function() {
    const wrapper = shallow(<UsersPage />);
    expect(wrapper.find('DataTable')).to.have.lengthOf(1);
  });

  it('should have a PageTitle component', function() {
    const wrapper = shallow(<UsersPage />);
    expect(wrapper.find('PageTitle')).to.have.lengthOf(1);
  });

  it('should fetch cashiers on mount', function() {
    const fetchStub = sinon.stub(global, 'fetch');
    fetchStub.resolves({
      json: () => Promise.resolve([]),
    });
    shallow(<UsersPage />);
    expect(fetchStub.calledWith('http://localhost:3000/cashier')).to.be.true;
    fetchStub.restore();
  });

});