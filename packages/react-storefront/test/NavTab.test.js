/**
 * @license
 * Copyright © 2017-2018 Moov Corporation.  All rights reserved.
 */
import React from 'react'
import { mount } from 'enzyme'
import NavTab from '../src/NavTab'
import Provider from './TestProvider'

describe('NavTab', () => {
  it('should add a menu button to the tab defined by menuButtonRenderer', () => {
    const menuButtonClicked = jest.fn(x => x)

    const renderMenuButton = menu => {
      return <button id={'menu-button'} onClick={menuButtonClicked.bind(null, menu)}></button>
    }

    const component = (
      <Provider>
        <NavTab menuButtonRenderer={renderMenuButton}>{'menu'}</NavTab>
      </Provider>
    )

    mount(component)
      .find('#menu-button')
      .at(0)
      .simulate('click')

    expect(menuButtonClicked).toHaveBeenCalledWith('menu', expect.anything())
  })
})
