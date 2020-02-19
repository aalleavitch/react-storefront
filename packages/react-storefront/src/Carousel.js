/**
 * @license
 * Copyright © 2017-2018 Moov Corporation.  All rights reserved.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay, virtualize } from 'react-swipeable-views-utils'
import withStyles from '@material-ui/core/styles/withStyles'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import IconButton from '@material-ui/core/IconButton'
import { fade } from '@material-ui/core/styles/colorManipulator'
import classnames from 'classnames'
import { inject, observer } from 'mobx-react'
import AmpCarousel from './amp/AmpCarousel'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)
const VirtualizeSwipeableViews = virtualize(SwipeableViews)
const AutoPlayVirtualizeSwipeableViews = autoPlay(VirtualizeSwipeableViews)

export const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',

    '& img': {
      display: 'block'
    }
  },

  swipeWrap: {
    position: 'relative',
    overflow: 'hidden',
    flex: 1,
    '& .react-swipeable-view-container, & > div:first-child': {
      height: '100%'
    }
  },

  arrows: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },

  arrow: {
    position: 'absolute',
    top: '50%',
    marginTop: '-24px'
  },

  leftArrow: {
    left: 0
  },

  rightArrow: {
    right: 0
  },

  icon: {
    height: '30px',
    width: '30px'
  },

  dot: {
    backgroundColor: fade(theme.palette.text.primary, 0.25),
    width: 8,
    height: 8,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: theme.palette.background.paper,
    borderRadius: '50%',
    display: 'inline-block',
    margin: '0 2px',
    // Same duration as SwipeableViews animation
    transitionDuration: '0.35s'
  },

  dotSelected: {
    backgroundColor: theme.palette.text.primary
  },

  dots: {
    position: 'absolute',
    bottom: '5px',
    textAlign: 'center',
    width: '100%'
  },

  indicator: {
    display: 'none'
  }
})

@withStyles(styles, { name: 'RSFCarousel' })
@inject('app')
@observer
export default class Carousel extends Component {
  static propTypes = {
    /**
     * Display left/right arrows for navigating through slides
     */
    arrows: PropTypes.bool,

    /**
     * Display indicator dots at the bottom of the component
     */
    indicators: PropTypes.bool,

    /*
     * Option to manually set the selected index
     */
    selectedIndex: PropTypes.number,

    /**
     * If false, the auto play behavior is disabled
     */
    autoplay: PropTypes.bool,

    /**
     * This is the auto play direction
     */
    direction: PropTypes.string,

    /**
     * Delay between auto play transitions (in ms)
     */
    interval: PropTypes.number,

    /**
     * If true, scrolling past the last slide will cycle back to the first
     */
    infinite: PropTypes.bool,

    /**
     * If infinite is enabled, this prop can be used to override the slideRenderer
     */
    slideRenderer: PropTypes.func,

    /**
     * If infinite is enabled, the number of slides to show for each index
     */
    slidesToShow: PropTypes.number,

    /**
     * Amount of pixels to pad the slide container
     */
    inset: PropTypes.number,

    /**
     * Amount of pixels of spacing between each slide
     */
    slideSpacing: PropTypes.number,

    /**
     * Additional props to be passed on to the react-swipeable-views component
     */
    swipeableViewsProps: PropTypes.object
  }

  static defaultProps = {
    arrows: true,
    indicators: false,
    autoplay: false,
    direction: 'incremental',
    interval: 3000,
    infinite: false,
    slideRenderer: null,
    slidesToShow: 1,
    inset: 0,
    slideSpacing: 0,
    swipeabeViewsProps: {}
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const nextState = {
      selectedIndex:
        nextProps.selectedIndex != null ? nextProps.selectedIndex : prevState.selectedIndex || 0,
      maxIndex: Math.ceil(React.Children.count(nextProps.children) / nextProps.slidesToShow)
    }

    if (prevState.selectedIndex == null) {
      return nextState
    } else {
      return null
    }
  }

  state = {}

  componentWillUnmount() {
    if (this.disposeReaction) {
      this.disposeReaction()
    }
  }

  renderDot(index) {
    const { selectedIndex, maxIndex } = this.state
    const classes = classnames(this.props.classes.dot, {
      [this.props.classes.dotSelected]: index === this.mod(selectedIndex, maxIndex)
    })
    return <div key={index} className={classes} />
  }

  mod(n, m) {
    const q = n % m
    return q < 0 ? q + m : q
  }

  slideRenderer = ({ key, index }) => {
    const { children, slidesToShow } = this.props
    const { maxIndex } = this.state
    const slideCount = React.Children.count(children)

    let baseindex = this.mod(index, maxIndex) * slidesToShow
    baseindex = baseindex + slidesToShow >= slideCount ? slideCount - slidesToShow : baseindex
    let slide = []
    for (let i = 0; i < slidesToShow; i++) {
      slide.push(
        React.cloneElement(children[baseindex + i], {
          style: { width: 100 / slidesToShow + '%', display: 'inline-block' },
          key: key + '_' + i
        })
      )
    }

    return <div key={key}>{slide}</div>
  }

  render() {
    let {
      app,
      classes,
      className,
      arrows,
      indicators,
      style,
      children,
      autoplay,
      infinite,
      slideRenderer,
      slidesToShow,
      interval,
      direction,
      inset,
      slideSpacing,
      swipeableViewsProps
    } = this.props

    if (app.amp) return <AmpCarousel {...this.props} />

    const { selectedIndex } = this.state

    const slideCount = React.Children.count(children)

    let Tag = infinite ? VirtualizeSwipeableViews : SwipeableViews
    Tag = autoplay ? AutoPlaySwipeableViews : Tag
    Tag = infinite && autoplay ? AutoPlayVirtualizeSwipeableViews : Tag

    return (
      <div className={classnames(className, classes.root)} style={style}>
        <div className={classes.swipeWrap}>
          {!infinite && (
            <Tag
              index={selectedIndex}
              onChangeIndex={i => this.setState({ selectedIndex: i })}
              direction={direction}
              interval={interval}
              slideStyle={{
                padding: `0 ${slideSpacing}px`
              }}
              style={{
                padding: `0 ${inset}px`
              }}
              {...swipeableViewsProps}
            >
              {children}
            </Tag>
          )}
          {infinite && (
            <Tag
              index={selectedIndex}
              onChangeIndex={i => this.setState({ selectedIndex: i })}
              direction={direction}
              interval={interval}
              slideRenderer={infinite && (slideRenderer || this.slideRenderer)}
              slideStyle={{
                padding: `0 ${slideSpacing}px`
              }}
              style={{
                padding: `0 ${inset}px`
              }}
              {...swipeableViewsProps}
            />
          )}

          {arrows && slideCount > slidesToShow && (
            <div className={classes.arrows}>
              {(selectedIndex !== 0 || infinite) && (
                <IconButton
                  className={classnames(classes.arrow, classes.leftArrow)}
                  onClick={() => this.setState({ selectedIndex: selectedIndex - 1 })}
                >
                  <ChevronLeft classes={{ root: classes.icon }} />
                </IconButton>
              )}
              {(selectedIndex !== slideCount - 1 || infinite) && (
                <IconButton
                  className={classnames(classes.arrow, classes.rightArrow)}
                  onClick={() => this.setState({ selectedIndex: selectedIndex + 1 })}
                >
                  <ChevronRight classes={{ root: classes.icon }} />
                </IconButton>
              )}
            </div>
          )}

          {indicators && slideCount > slidesToShow && (
            <div className={classes.dots}>
              {Array(Math.ceil(slideCount / slidesToShow))
                .fill(0)
                .map((_, index) => this.renderDot(index))}
            </div>
          )}
        </div>
      </div>
    )
  }
}
