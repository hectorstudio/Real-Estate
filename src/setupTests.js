/* eslint-disable import/no-extraneous-dependencies */
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import fetch from 'jest-fetch-mock';
import 'regenerator-runtime/runtime';

Enzyme.configure({ adapter: new EnzymeAdapter() });

global.fetch = fetch;
