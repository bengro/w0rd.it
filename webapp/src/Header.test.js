import React from 'react';
import Header from "./Header";
import {mount} from "enzyme";

it('renders header without shortened url', () => {
  const wrapper = mount(<Header hash={undefined}/>);

  expect(wrapper.find('.title__hash').text()).toBe('');
});

it('renders header with a shortened url', () => {
  const shortenedUrl = {
    hash: 'pluripotent',
    description: '(of a cell) capable of developing into any type of cell or tissue except those that form a placenta or embryo',
    url: 'https://example.com'
  };
  const wrapper = mount(<Header shortenedUrl={shortenedUrl}/>);

  expect(wrapper.find('.title__hash').text()).toBe('pluripotent');
  expect(wrapper.find('.bubble').text()).toContain('capable of developing into any');
});
