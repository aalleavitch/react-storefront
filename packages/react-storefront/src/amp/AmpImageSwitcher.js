/**
 * @license
 * Copyright © 2017-2018 Moov Corporation.  All rights reserved.
 */
import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import classnames from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'
import { inject } from 'mobx-react'
import PropTypes from 'prop-types'

export const styles = theme => ({
  root: {
    height: '300px',
    width: '450px',
    position: 'relative',
    '& > *': {
      paddingBottom: 'none'
    },
    '& *[role=button]': {
      borderRadius: '50%',
      opacity: '0.5',
      outline: 'none',
      backgroundColor: 'rgba(0,0,0,0.3)'
    }
  },

  // This fixes the issue where images do not show up sometimes when amp-carousel is placed in
  // a div with display: flex.  See https://github.com/ampproject/amphtml/issues/14519
  rootImportant: {
    '&$root': {
      display: 'block'
    }
  },

  carouselWrap: {
    height: 'calc(100% - 65px)',
    position: 'relative'
  },

  thumbnails: {
    marginTop: '10px',
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'stretch',
    maxWidth: '100%',
    overflowX: 'auto'
  },

  thumbnailsWrap: {
    display: 'flex',
    margin: 'auto',
    justifyContent: 'flex-start'
  },

  thumbnail: {
    height: '70px',
    width: '50px',
    position: 'relative',
    margin: '0 2px',
    border: 'none',
    outline: 'none',
    background: 'none',
    opacity: 0.7,
    '& img': {
      objectFit: 'contain'
    }
  },

  thumbnailSelected: {
    opacity: 1
  },

  thumbnailSelectedLine: {
    borderBottom: `3px solid ${theme.palette.secondary.main}`,
    width: '50px',
    margin: '0px 2px',
    position: 'relative',
    bottom: '4px'
  },

  dot: {},
  dots: {},
  dotSelected: {},

  '@global': {
    'amp-lightbox-gallery div[aria-label="Gallery"]': {
      display: 'none'
    }
  }
})

/**
 * An AMP-compatible image switcher with pinch and zoom.
 */
@withStyles(styles, { name: 'RSFAmpImageSwitcher' })
@inject('nextId', 'ampStateId')
export default class AmpImageSwitcher extends Component {
  static propTypes = {
    /**
     * The amp-carousel type.  Can be "slides" or "carousel".  Defaults to "slides".
     */
    type: PropTypes.oneOf(['slides', 'carousel']),

    /**
     * Set to true to display dots indicated which image in the series is selected.  Defaults to false
     */
    indicators: PropTypes.bool,

    /**
     * The property in the amp state to bind to.  Defaults to "selectedImage"
     */
    ampStateProperty: PropTypes.string,

    /**
     * Set to true to display left and right arrows.  Defaults to false
     */
    arrows: PropTypes.bool
  }

  static defaultProps = {
    type: 'slides',
    indicators: false,
    ampStateProperty: 'selectedImage',
    arrows: false
  }

  constructor({ id, nextId }) {
    super()
    id = id || nextId()
    this.id = id || `moov-image-switcher-${id}`
    this.ampStateId = `moovImageSwitcherState${id}`
  }

  render() {
    let {
      type,
      arrows,
      indicators,
      ampStateId,
      ampStateProperty,
      images,
      thumbnails,
      classes,
      className
    } = this.props
    const { id } = this

    const pathname = '/p/1'

    return (
      <div className={classnames(className, classes.root, classes.rootImportant)}>
        <Helmet>
          <script
            async
            custom-element="amp-list"
            src="https://cdn.ampproject.org/v0/amp-list-0.1.js"
          />
          <script
            async
            custom-template="amp-mustache"
            src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js"
          />
          <script
            async
            custom-element="amp-carousel"
            src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"
          />
          <script
            async
            custom-element="amp-lightbox-gallery"
            src="https://cdn.ampproject.org/v0/amp-lightbox-gallery-0.1.js"
          />
        </Helmet>
        <div className={classes.carouselWrap}>
          <amp-list
            layout="fill"
            id="list"
            src={`${pathname}/images/cccccc.json`}
            amp-bind={`src=>'${pathname}/images/' + moovAmpState.color.selected.id + '.json'`}
            items="amp"
            single-item
          >
            <template type="amp-mustache">
              <amp-carousel
                controls={arrows ? true : undefined}
                id={id}
                layout="fill"
                type={type}
                loop
                amp-bind={`slide=>${ampStateId}.${ampStateProperty}`}
                on={`slideChange:AMP.setState({ ${ampStateId}: { ${ampStateProperty}: event.index } })`}
                dangerouslySetInnerHTML={{
                  __html: `
                {{#items}}
                  <amp-img lightbox src="{{src}}" layout="fill" alt="{{alt}}"></amp-img>
                {{/items}}`
                }}
              />
            </template>
          </amp-list>

          {indicators && (
            <div className={classes.dots}>
              {images.map(({ src }, i) => (
                <div
                  key={src}
                  amp-bind={`class=>${ampStateId}.${ampStateProperty} == ${i} ? '${classes.dot} ${
                    classes.dotSelected
                  }' : '${classes.dot}'`}
                  className={classnames(classes.dot, { [classes.dotSelected]: i === 0 })}
                />
              ))}
            </div>
          )}
        </div>
        {thumbnails && thumbnails.length > 0 && (
          <div className={classes.thumbnails}>
            <div className={classes.thumbnailsWrap}>
              {thumbnails.map(({ src, alt }, i) => (
                <button
                  key={src}
                  type="button"
                  on={`tap:AMP.setState({ ${ampStateId}: { ${ampStateProperty}: ${i} }})`}
                  className={classes.thumbnail}
                >
                  <amp-img
                    src={src}
                    alt={alt}
                    layout="fill"
                    amp-bind={`class=>${ampStateId}.${ampStateProperty} == ${i} ? '${
                      classes.thumbnail
                    } ${classes.thumbnailSelected}' : '${classes.thumbnail}'`}
                    class={classnames(classes.thumbnail, {
                      [classes.thumbnailSelected]: i === 0
                    })}
                  />
                  {
                    <div
                      className={i === 0 ? classes.thumbnailSelectedLine : ''}
                      amp-bind={`class=>${ampStateId}.${ampStateProperty} == ${i} ? '${
                        classes.thumbnailSelectedLine
                      }' : ''`}
                    />
                  }
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
}
