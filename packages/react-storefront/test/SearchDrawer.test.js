/**
 * @license
 * Copyright © 2017-2018 Moov Corporation.  All rights reserved.
 */
import React from 'react'
import SearchDrawer from '../src/SearchDrawer'
import { mount } from 'enzyme'
import Provider from './TestProvider'
import AppModelBase from '../src/model/AppModelBase'
import { createMemoryHistory } from 'history'
import waitForAnalytics from './helpers/waitForAnalytics'
import AnalyticsProvider from '../src/AnalyticsProvider'

describe('SearchDrawer', () => {
  let TestContext, app, history

  beforeEach(() => {
    app = AppModelBase.create({ search: { show: true } })
    history = createMemoryHistory()
    history.push = jest.fn()

    TestContext = ({ children }) => (
      <div id="root">
        <Provider app={app} history={history}>
          {children}
        </Provider>
      </div>
    )
  })

  it('should render with no props', () => {
    expect(
      mount(
        <TestContext>
          <SearchDrawer />
        </TestContext>
      )
    ).toMatchSnapshot()
  })

  it('should set input placeholder text when props.placeholder is set', () => {
    const wrapper = mount(
      <TestContext>
        <SearchDrawer placeholder="foo" />
      </TestContext>
    )

    expect(wrapper.find('input').props().placeholder).toBe('foo')
  })

  it('should use a text button when closeButtonText is set', () => {
    const wrapper = mount(
      <TestContext>
        <SearchDrawer closeButtonText="foo" />
      </TestContext>
    )

    expect(
      wrapper
        .find('button')
        .first()
        .text()
    ).toBe('foo')
  })

  it('should blur the background by default', () => {
    app.search.toggle(false)
    document.body.classList.remove('moov-blur')

    mount(
      <TestContext>
        <SearchDrawer />
      </TestContext>
    )

    app.search.toggle(true)

    expect(document.body.classList.contains('moov-blur')).toBe(true)
  })

  it('should not blur background when blurBackground={false}', () => {
    app.search.toggle(false)
    document.body.classList.remove('moov-blur')

    mount(
      <TestContext>
        <SearchDrawer blurBackground={false} />
      </TestContext>
    )

    app.search.toggle(true)

    expect(document.body.classList.contains('moov-blur')).toBe(false)
  })

  describe('searchButtonVariant', () => {
    describe('fab', () => {
      it('should render the search button as a separate fab when text is entered', () => {
        const wrapper = mount(
          <TestContext>
            <SearchDrawer searchButtonVariant="fab" />
          </TestContext>
        )
        wrapper.find('input').simulate('change', { target: { value: 'My new value' } })
        expect(wrapper.find({ rel: 'search' }).exists()).toBe(true)
        expect(wrapper.find({ rel: 'clear' }).exists()).toBe(true)
      })
    })
    describe('icon', () => {
      it('should not show the clear button when showClearButton is false and text is entered', () => {
        const wrapper = mount(
          <TestContext>
            <SearchDrawer showClearButton={false} searchButtonVariant="icon" />
          </TestContext>
        )
        wrapper.find('input').simulate('change', { target: { value: 'My new value' } })
        expect(wrapper.find({ rel: 'clear' }).exists()).toBe(false)
      })
      it('should show the clear text is entered', () => {
        const wrapper = mount(
          <TestContext>
            <SearchDrawer searchButtonVariant="icon" />
          </TestContext>
        )
        wrapper.find('input').simulate('change', { target: { value: 'My new value' } })
        expect(wrapper.find({ rel: 'clear' }).exists()).toBe(true)
        expect(wrapper.find({ rel: 'search' }).exists()).toBe(false)
      })
    })
  })

  describe('searchButtonVariant', () => {
    describe('fab', () => {
      it('should render the search button as a separate fab when text is entered', () => {
        const wrapper = mount(
          <TestContext>
            <SearchDrawer searchButtonVariant="fab" />
          </TestContext>
        )
        wrapper.find('input').simulate('change', { target: { value: 'My new value' } })
        expect(wrapper.find({ rel: 'search' }).exists()).toBe(true)
        expect(wrapper.find({ rel: 'clear' }).exists()).toBe(true)
      })
    })
    describe('icon', () => {
      it('should not show the clear button when showClearButton is false and text is entered', () => {
        const wrapper = mount(
          <TestContext>
            <SearchDrawer showClearButton={false} searchButtonVariant="icon" />
          </TestContext>
        )
        wrapper.find('input').simulate('change', { target: { value: 'My new value' } })
        expect(wrapper.find({ rel: 'clear' }).exists()).toBe(false)
      })
      it('should show the clear text is entered', () => {
        const wrapper = mount(
          <TestContext>
            <SearchDrawer searchButtonVariant="icon" />
          </TestContext>
        )
        wrapper.find('input').simulate('change', { target: { value: 'My new value' } })
        expect(wrapper.find({ rel: 'clear' }).exists()).toBe(true)
        expect(wrapper.find({ rel: 'search' }).exists()).toBe(false)
      })
    })
  })

  describe('initialContent', () => {
    it('should render when the search is blank', () => {
      const wrapper = mount(
        <TestContext>
          <SearchDrawer searchButtonVariant="icon" initialContent={<div id="initialContent" />} />
        </TestContext>
      )
      expect(wrapper.find('div#initialContent')).toHaveLength(1)
    })

    it('should hide when the search is filled', () => {
      const wrapper = mount(
        <TestContext>
          <SearchDrawer searchButtonVariant="icon" initialContent={<div id="initialContent" />} />
        </TestContext>
      )
      wrapper.find('input').simulate('change', { target: { value: 'My new value' } })
      expect(wrapper.find('div#initialContent')).toHaveLength(0)
    })
  })

  describe('createSubmitURL', () => {
    it('should change the url to this when the user submits the search', () => {
      const createSubmitURL = jest.fn(text => '/submit')
      app.search.setText('foo')
      const wrapper = mount(
        <TestContext>
          <SearchDrawer createSubmitURL={createSubmitURL} />
        </TestContext>
      )
      wrapper.find('SearchIcon').simulate('click')
      expect(createSubmitURL).toHaveBeenCalledWith('foo')
      expect(history.push).toHaveBeenCalledWith('/submit')
    })

    it('should use the default when not defined', () => {
      app.search.setText('foo')
      const wrapper = mount(
        <TestContext>
          <SearchDrawer />
        </TestContext>
      )
      wrapper.find('SearchIcon').simulate('click')
      expect(history.push).toHaveBeenCalledWith('/search?q=foo')
    })
  })

  describe('with initialGroups', () => {
    beforeEach(() => {
      app = AppModelBase.create({
        search: {
          show: true,
          initialGroups: [
            {
              caption: 'Suggestions',
              results: [
                {
                  text: 'Result 1',
                  url: '/results/1'
                }
              ]
            }
          ]
        }
      })
    })
    it('should display the initialGroups', () => {
      const wrapper = mount(
        <TestContext>
          <SearchDrawer />
        </TestContext>
      )
      expect(wrapper.find('a[href="/results/1"]')).toHaveLength(1)
    })
    it('should not display the initialContent', () => {
      const wrapper = mount(
        <TestContext>
          <SearchDrawer initialContent={<div id="initialContent" />} />
        </TestContext>
      )
      expect(wrapper.find('div#initialContent')).toHaveLength(0)
    })
  })

  describe('analytics events', () => {
    fetch.mockResponse(
      JSON.stringify({
        search: {
          groups: []
        }
      })
    )

    beforeEach(() => {
      app = AppModelBase.create({
        search: {
          show: true,
          text: 'query',
          groups: [
            {
              caption: 'Results',
              results: [
                {
                  text: 'Result 1',
                  url: '/results/1'
                },
                {
                  text: 'Result 2',
                  url: '/results/2'
                }
              ]
            }
          ]
        }
      })
    })

    it('should fire search link clicked', () => {
      const searchSubmitted = jest.fn()

      const wrapper = mount(
        <Provider app={app} history={history}>
          <AnalyticsProvider targets={() => [{ searchSubmitted }]}>
            <SearchDrawer />
          </AnalyticsProvider>
        </Provider>
      )

      wrapper
        .find('Track')
        .at(0)
        .simulate('click')

      return waitForAnalytics(() => {
        expect(history.push).toHaveBeenCalledWith('/results/1', undefined)
        expect(searchSubmitted).toHaveBeenCalledWith({ term: 'query' })
      })
    })

    it('should fire submitted on search icon click', () => {
      const searchSubmitted = jest.fn()

      const wrapper = mount(
        <Provider app={app} history={history}>
          <AnalyticsProvider targets={() => [{ searchSubmitted }]}>
            <SearchDrawer />
          </AnalyticsProvider>
        </Provider>
      )

      wrapper
        .find('SearchIcon')
        .at(0)
        .simulate('click')

      return waitForAnalytics(() => {
        expect(searchSubmitted).toHaveBeenCalledWith({ term: 'query' })
      })
    })

    it('should fire submitted on form submit', () => {
      const searchSubmitted = jest.fn()

      const wrapper = mount(
        <Provider app={app} history={history}>
          <AnalyticsProvider targets={() => [{ searchSubmitted }]}>
            <SearchDrawer />
          </AnalyticsProvider>
        </Provider>
      )

      wrapper
        .find('form')
        .at(0)
        .simulate('submit')

      return waitForAnalytics(() => {
        expect(searchSubmitted).toHaveBeenCalledWith({ term: 'query' })
      })
    })
  })
})
