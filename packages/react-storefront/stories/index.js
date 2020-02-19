import React from 'react'

import { storiesOf, setAddon } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import JSXAddon from 'storybook-addon-jsx'
import green from '@material-ui/core/colors/green'
import wrapWithProvider from './wrapWithProvider'
import ActionButton from '../src/ActionButton'
import AddToCartButton from '../src/AddToCartButton'
import Typography from '@material-ui/core/Typography'
import BackToTop from '../src/BackToTop'
import BottomDrawer from '../src/BottomDrawer'
import Box from '../src/Box'
import ButtonSelector from '../src/ButtonSelector'
import CartButton from '../src/CartButton'
import Carousel from '../src/Carousel'
import CheckoutButton from '../src/CheckoutButton'
import CmsSlot from '../src/CmsSlot'
import Container from '../src/Container'
import DialogClose from '../src/DialogClose'
import Divider from '../src/Divider'
import Drawer from '../src/Drawer'
import Redbox from '../src/Redbox'
import ExpandableSection from '../src/ExpandableSection'
import FilterButton from '../src/FilterButton'
import HeaderLogo from '../src/HeaderLogo'
import Image from '../src/Image'
import ImageSwitcher from '../src/ImageSwitcher'
import Link from '../src/Link'
import LoadMask from '../src/LoadMask'
import Menu from '../src/Menu'
import PromoBanner from '../src/PromoBanner'
import QuantitySelector from '../src/QuantitySelector'
import Rating from '../src/Rating'
import ResponsiveTiles from '../src/ResponsiveTiles'
import SearchDrawer from '../src/SearchDrawer'
import ShowMore from '../src/ShowMore'
import { Skeleton, Row, Space, Content, BlankRow } from '../src/Skeleton'
import {
  FacebookShareButton,
  TwitterShareButton,
  GooglePlusShareButton,
  PinterestShareButton
} from '../src/SocialShareButtons'
import SortButton from '../src/SortButton'
import Sort from '../src/Sort'
import Spacer from '../src/Spacer'
import TabPanel from '../src/TabPanel'
import TabsRow from '../src/TabsRow'
import ToolbarButton from '../src/ToolbarButton'
import BackNav from '../src/BackNav'
import Video from '../src/Video'

// Models
import SearchModelBase, { ResultsGroupModel, ResultsModel } from '../src/model/SearchModelBase'
import SelectionModelBase from '../src/model/SelectionModelBase'
import OptionModelBase from '../src/model/OptionModelBase'
import SearchResultsModelBase, {
  FacetGroupModelBase,
  FacetModelBase,
  SortBase
} from '../src/model/SearchResultsModelBase'

import PhotoCamera from '@material-ui/icons/PhotoCamera'
import PaginationContainer from './PaginationContainer'
import Pets from '@material-ui/icons/Pets'
import ThumbUp from '@material-ui/icons/ThumbUp'
import ThumbUpOutlined from '@material-ui/icons/ThumbUpOutlined'

setAddon(JSXAddon)

storiesOf('ActionButton', module)
  .addDecorator(wrapWithProvider())
  .addWithJSX('with default props', () => <ActionButton label="Label" />)
  .addWithJSX('with caption', () => <ActionButton label="Label" value="caption" />)

storiesOf('AddToCartButton', module)
  .addDecorator(
    wrapWithProvider(
      {},
      {
        palette: {
          secondary: green
        }
      }
    )
  )
  .addWithJSX('with custom theme', () => <AddToCartButton confirmation="Added to cart" />)

// storiesOf('AppBar', module)
// 	.addDecorator(wrapWithProvider())
//     .add('with default props', () => <AppBar />)

storiesOf('BackToTop', module)
  .addDecorator(wrapWithProvider())
  .addWithJSX('with default props', () => (
    <Typography>
      <div style={{ height: 5000 }}>Scroll down please...</div>
      <BackToTop />
    </Typography>
  ))
  .addWithJSX('with custom icon', () => (
    <Typography>
      <div style={{ height: 5000 }}>Scroll down please...</div>
      <BackToTop Icon={Pets} />
    </Typography>
  ))
  .addWithJSX('with smaller size', () => (
    <Typography>
      <div style={{ height: 5000 }}>Scroll down please...</div>
      <BackToTop size="small" />
    </Typography>
  ))
  .addWithJSX('with larger size', () => (
    <Typography>
      <div style={{ height: 5000 }}>Scroll down please...</div>
      <BackToTop size="large" />
    </Typography>
  ))
  .addWithJSX('with farther showUnderY value', () => (
    <Typography>
      <div style={{ height: 5000 }}>Scroll down please...</div>
      <BackToTop showUnderY={1000} />
    </Typography>
  ))
  .addWithJSX('with closer instantBehaviorUnderY value', () => (
    <Typography>
      <div style={{ height: 5000 }}>Scroll down please...</div>
      <BackToTop instantBehaviorUnderY={500} />
    </Typography>
  ))
  .addWithJSX('with fadeTime of zero', () => (
    <Typography>
      <div style={{ height: 5000 }}>Scroll down please...</div>
      <BackToTop fadeTime={0} />
    </Typography>
  ))

storiesOf('BottomDrawer', module)
  .addDecorator(wrapWithProvider())
  .addWithJSX('with default props', () => <BottomDrawer>Content</BottomDrawer>)

const Placeholder = ({ width = 50, height = 50 }) => (
  <div style={{ width, height, backgroundColor: '#666' }} />
)

storiesOf('Box', module)
  .addDecorator(wrapWithProvider())
  .addWithJSX('with default props', () => (
    <Box>
      <Placeholder />
      <Placeholder />
      <Placeholder />
    </Box>
  ))
  .addWithJSX('with split', () => (
    <Box split>
      <Placeholder />
      <Placeholder />
      <Placeholder />
    </Box>
  ))

storiesOf('BackNav', module)
  .addDecorator(wrapWithProvider())
  .addWithJSX('plain', () => <BackNav text="Rugs" url="/c/rugs" />)
  .addWithJSX('with layout controls', () => (
    <BackNav text="Rugs" url="/c/rugs" searchResults={SearchResultsModelBase.create({})} />
  ))

const selectionModelWithImages = SelectionModelBase.create({
  options: [
    OptionModelBase.create({ id: 'big', image: 'http://via.placeholder.com/35/d32f2f/d32f2f' }),
    OptionModelBase.create({ id: 'medium', image: 'http://via.placeholder.com/35/388E3C/388E3C' }),
    OptionModelBase.create({ id: 'small', image: 'http://via.placeholder.com/35/1565c0/1565c0' })
  ],
  selected: OptionModelBase.create({
    id: 'medium',
    image: 'http://via.placeholder.com/35/388E3C/388E3C'
  })
})

const selectionModelWithText = SelectionModelBase.create({
  options: [
    OptionModelBase.create({ id: 'large', text: 'Large' }),
    OptionModelBase.create({ id: 'medium', text: 'Medium' }),
    OptionModelBase.create({ id: 'small', text: 'Small' })
  ],
  selected: OptionModelBase.create({ id: 'medium', text: 'Medium' })
})

const selectionModelWithColors = SelectionModelBase.create({
  options: [
    OptionModelBase.create({ id: 'large', color: '#ff0000' }),
    OptionModelBase.create({ id: 'medium', color: '#00ff00' }),
    OptionModelBase.create({ id: 'small', color: 'rgb(0, 0, 255)' })
  ],
  selected: OptionModelBase.create({ id: 'medium', text: 'Medium' })
})

const selectionModelWithDisabled = SelectionModelBase.create({
  options: [
    OptionModelBase.create({ id: 'large', color: '#ff0000' }),
    OptionModelBase.create({ id: 'medium', color: '#00ff00' }),
    OptionModelBase.create({ id: 'small', disabled: true, color: 'rgb(0, 0, 255)' })
  ],
  selected: OptionModelBase.create({ id: 'medium', text: 'Medium' })
})

storiesOf('ButtonSelector', module)
  .addDecorator(wrapWithProvider())
  .addWithJSX('with text options', () => (
    <ButtonSelector
      model={selectionModelWithText}
      onSelectionChange={(_, item) => selectionModelWithText.setSelected(item)}
    />
  ))
  .addWithJSX('with image options', () => (
    <ButtonSelector
      model={selectionModelWithImages}
      onSelectionChange={(_, item) => selectionModelWithImages.setSelected(item)}
    />
  ))
  .addWithJSX('with color options', () => (
    <ButtonSelector
      model={selectionModelWithColors}
      onSelectionChange={(_, item) => selectionModelWithColors.setSelected(item)}
    />
  ))
  .addWithJSX('with disabled options', () => (
    <ButtonSelector
      model={selectionModelWithDisabled}
      strikeThroughDisabled
      strikeTroughAngle={45}
      onSelectionChange={(_, item) => selectionModelWithDisabled.setSelected(item)}
    />
  ))

require('./Breadcrumbs.stories')

storiesOf('CartButton', module)
  .addDecorator(wrapWithProvider())
  .addWithJSX('with default props', () => <CartButton />)

storiesOf('Carousel', module)
  .addDecorator(wrapWithProvider())
  .addWithJSX('with infinite scroll', () => (
    <Carousel infinite={true} indicators={true} slidesToShow={2}>
      <div><div style={{ height: '300px', backgroundColor: 'red' }}></div></div>
      <div><div style={{ height: '300px', backgroundColor: 'blue' }}></div></div>
      <div><div style={{ height: '300px', backgroundColor: 'green' }}></div></div>
      <div><div style={{ height: '300px', backgroundColor: 'yellow' }}></div></div>
      <div><div style={{ height: '300px', backgroundColor: 'orange' }}></div></div>
    </Carousel>
  ))

storiesOf('CheckoutButton', module)
  .addDecorator(wrapWithProvider())
  .addWithJSX('with default props', () => <CheckoutButton />)

storiesOf('CmsSlot', module)
  .addWithJSX('with default props', () => (
    <div>
      <CmsSlot>{'<h1>Title</h1>'}</CmsSlot>
      <CmsSlot>
        {
          '<p style="width: 50%">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus semper purus, vitae pharetra tellus vulputate eu. Integer eget ipsum quis magna vehicula elementum a in risus. Pellentesque mollis augue dui, vitae maximus nulla laoreet vitae. Nullam porttitor rutrum velit eu condimentum.</p>'
        }
      </CmsSlot>
    </div>
  ))
  .addWithJSX('with inline', () => (
    <div>
      <CmsSlot inline>{'<span style="font-weight: bold">Title:  </span>'}</CmsSlot>
      <CmsSlot inline>
        {'<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </span>'}
      </CmsSlot>
    </div>
  ))
  .addWithJSX('with lazy loaded images', () => (
    <div>
      <CmsSlot>
        {`
        <div style="height: 500px;"></div>
        <img data-src="https://placehold.it/600" data-rsf-lazy>
        <div style="height: 600px;"></div>
        <img data-src="https://placehold.it/200" data-rsf-lazy>
        <div style="height: 1500px;"></div>
        <img data-src="https://placehold.it/800x200" data-rsf-lazy>  
        `}
      </CmsSlot>
    </div>
  ))

storiesOf('Container', module).addWithJSX('with default props', () => (
  <div>
    <Container>
      <h1>Title</h1>
    </Container>
  </div>
))

storiesOf('DialogClose', module)
  .addDecorator(wrapWithProvider())
  .addWithJSX('with default props', () => <DialogClose />)

storiesOf('Divider', module)
  .addDecorator(wrapWithProvider())
  .addWithJSX('horizontal', () => <Divider />)
  .addWithJSX('vertical', () => (
    <div style={{ height: '50px' }}>
      <Divider vertical />
    </div>
  ))

storiesOf('Drawer', module)
  .addDecorator(wrapWithProvider())
  .addWithJSX('with default props', () => (
    <Drawer title="Drawer" open>
      Contents
    </Drawer>
  ))

storiesOf('Redbox', module)
  .addDecorator(wrapWithProvider({ error: 'Something went wrong', stack: 'This is a stack...' }))
  .addWithJSX('with default props', () => <Redbox />)

storiesOf('ExpandableSection', module)
  .addDecorator(wrapWithProvider())
  .addWithJSX('with default props', () => {
    return <ExpandableSection title="Hello">New and Interesting</ExpandableSection>
  })

const filterModel = SearchResultsModelBase.create({
  filters: ['red', 'medium'],
  facetGroups: [
    FacetGroupModelBase.create({
      name: 'Color',
      facets: [
        FacetModelBase.create({ code: 'red', name: 'Red', matches: 20 }),
        FacetModelBase.create({ name: 'Green', matches: 10 }),
        FacetModelBase.create({ name: 'Blue', matches: 5 })
      ]
    }),
    FacetGroupModelBase.create({
      name: 'Size',
      facets: [
        FacetModelBase.create({ name: 'Large', matches: 3 }),
        FacetModelBase.create({ code: 'medium', name: 'Medium', matches: 7 }),
        FacetModelBase.create({ name: 'Small', matches: 1 })
      ]
    })
  ],
  sort: 'price',
  sortOptions: [
    SortBase.create({ code: 'name', name: 'Name' }),
    SortBase.create({ code: 'price', name: 'Price' }),
    SortBase.create({ code: 'size', name: 'Size' })
  ]
})

storiesOf('FilterButton', module)
  .addDecorator(wrapWithProvider())
  .addWithJSX('with default props', () => <FilterButton model={filterModel} />)

storiesOf('HeaderLogo', module)
  .addDecorator(wrapWithProvider())
  .addWithJSX('with default props', () => (
    <HeaderLogo>
      <img src="https://placehold.it/300x100?text=LOGO" />
    </HeaderLogo>
  ))

storiesOf('Image', module)
  .addDecorator(wrapWithProvider())
  .addWithJSX('with default props', () => <Image src="https://placehold.it/200x100" />)
  .addWithJSX('with optimized', () => <Image src="https://placehold.it/200x100" quality={20} />)
  .addWithJSX('with not found primary image', () => (
    <Image
      src="https://mock.com/test.png"
      notFoundSrc="https://placehold.it/300x300?text=NOT+FOUND"
    />
  ))
  .addWithJSX('with lazy', () => (
    <div>
      <div style={{ height: '2000px' }}>Scroll Down Please...</div>
      <Image src="https://placehold.it/300x300?text=LAZY" lazy />
    </div>
  ))

storiesOf('ImageSwitcher', module)
  .addDecorator(wrapWithProvider())
  .addWithJSX('with default props', () => (
    <ImageSwitcher
      arrows
      showIndicators
      images={[
        'https://via.placeholder.com/200?text=1',
        'https://via.placeholder.com/200?text=2',
        'https://via.placeholder.com/200?text=3'
      ]}
      thumbnails={[
        'https://via.placeholder.com/200?text=1',
        'https://via.placeholder.com/200?text=2',
        'https://via.placeholder.com/200?text=3'
      ]}
    />
  ))

require('./Lazy.stories')

storiesOf('Link', module)
  .addDecorator(wrapWithProvider())
  .addWithJSX('with default props', () => <Link to="/test">Test</Link>)
  .addWithJSX('with external target', () => (
    <Link server to="http://www.moovweb.com">
      Moovweb
    </Link>
  ))

storiesOf('LoadMask', module)
  .addDecorator(wrapWithProvider())
  .addWithJSX('with show', () => <LoadMask show />)

storiesOf('Menu', module)
  .addDecorator(wrapWithProvider())
  .addWithJSX('with default props', () => <Menu />)

require('./AMPMenu.stories')
require('./NavTabs.stories')

storiesOf('PromoBanner', module)
  .addDecorator(wrapWithProvider())
  .addWithJSX('with default props', () => (
    <PromoBanner src="https://placehold.it/400x50?text=PROMO" />
  ))
  .addWithJSX('with custom alt', () => (
    <PromoBanner src="https://placehold.it/400x50?text=PROMO" alt="This is custom" />
  ))

storiesOf('QuantitySelector', module)
  .addDecorator(wrapWithProvider())
  .addWithJSX('with default props', () => <QuantitySelector />)

storiesOf('Rating', module)
  .addDecorator(wrapWithProvider())
  .addWithJSX('with default props', () => <Rating value={3.5} />)
  .addWithJSX('with fill empty setting', () => <Rating value={2} fillEmpty />)
  .addWithJSX('with simple custom images', () => <Rating value={3} iconFull={Pets} fillEmpty />)
  .addWithJSX('with complex custom images', () => (
    <Rating value={3.5} iconFull={ThumbUp} iconHalf={ThumbUp} iconEmpty={ThumbUpOutlined} />
  ))

storiesOf('ResponsiveTiles', module)
  .addWithJSX('with default column sizes', () => (
    <ResponsiveTiles>
      <div style={{ color: 'white', textAlign: 'center', backgroundColor: '#720026' }}>A</div>
      <div style={{ color: 'white', textAlign: 'center', backgroundColor: '#CE4257' }}>B</div>
      <div style={{ color: 'white', textAlign: 'center', backgroundColor: '#FF7F51' }}>C</div>
      <div style={{ color: 'white', textAlign: 'center', backgroundColor: '#FF9B54' }}>D</div>
    </ResponsiveTiles>
  ))
  .addWithJSX('with custom column sizes', () => (
    <ResponsiveTiles cols={{ xl: 4, lg: 4, md: 2, sm: 1, xs: 1 }}>
      <div style={{ color: 'white', textAlign: 'center', backgroundColor: '#720026' }}>A</div>
      <div style={{ color: 'white', textAlign: 'center', backgroundColor: '#CE4257' }}>B</div>
      <div style={{ color: 'white', textAlign: 'center', backgroundColor: '#FF7F51' }}>C</div>
      <div style={{ color: 'white', textAlign: 'center', backgroundColor: '#FF9B54' }}>D</div>
    </ResponsiveTiles>
  ))
  .addWithJSX('with custom column spacing', () => (
    <ResponsiveTiles spacing={4}>
      <div style={{ color: 'white', textAlign: 'center', backgroundColor: '#720026' }}>A</div>
      <div style={{ color: 'white', textAlign: 'center', backgroundColor: '#CE4257' }}>B</div>
      <div style={{ color: 'white', textAlign: 'center', backgroundColor: '#FF7F51' }}>C</div>
      <div style={{ color: 'white', textAlign: 'center', backgroundColor: '#FF9B54' }}>D</div>
    </ResponsiveTiles>
  ))

require('./SearchDrawer.stories')

storiesOf('ShowMore', module)
  .addDecorator(wrapWithProvider())
  .addWithJSX('with button', () => {
    const model = SearchResultsModelBase.create({
      numberOfPages: 7
    })
    return (
      <PaginationContainer model={model}>
        <ShowMore model={model} />
      </PaginationContainer>
    )
  })
  .addWithJSX('with infinite scroll', () => {
    const model = SearchResultsModelBase.create({
      numberOfPages: 7
    })
    return (
      <PaginationContainer model={model}>
        <ShowMore infiniteScroll model={model} />
      </PaginationContainer>
    )
  })

storiesOf('Skeleton', module)
  .addDecorator(wrapWithProvider())
  .addWithJSX('with default props', () => (
    <div style={{ top: 0, width: 200, height: 300, position: 'relative' }}>
      <Skeleton>
        <BlankRow height="15px" />
        <Row height="16px">
          <Content flex="1" />
        </Row>
        <BlankRow height="10px" />
        <Row height="12px">
          <Content flex="1" />
        </Row>
        <BlankRow height="12px" />
        <Row height="10px">
          <Content flex="1" />
        </Row>
        <BlankRow height="55px" />
      </Skeleton>
    </div>
  ))

storiesOf('Social Share Buttons', module)
  .addDecorator(wrapWithProvider())
  .addWithJSX('facebook', () => <FacebookShareButton />)
  .addWithJSX('twitter', () => <TwitterShareButton text="This is text" />)
  .addWithJSX('google', () => <GooglePlusShareButton />)
  .addWithJSX('pinterest', () => <PinterestShareButton description="This is a description" />)

storiesOf('SortButton', module)
  .addDecorator(wrapWithProvider())
  .addWithJSX('with default props', () => <SortButton model={filterModel} />)
  .addWithJSX('with menu variant', () => <SortButton variant="menu" model={filterModel} />)

storiesOf('Sort', module)
  .addDecorator(wrapWithProvider())
  .addWithJSX('with default props', () => (
    <Sort model={filterModel} onSelect={e => action('Sort Selected')(e.name)} />
  ))

storiesOf('Spacer', module).addWithJSX('with default props', () => <Spacer />)

storiesOf('TabPanel', module)
  .addDecorator(wrapWithProvider())
  .addWithJSX('with default props', () => (
    <TabPanel ampStateId={123}>
      <div label="Description">Description here</div>
      <div label="Instructions">Instructions here</div>
    </TabPanel>
  ))

storiesOf('TabsRow', module)
  .addDecorator(wrapWithProvider())
  .addWithJSX('with default props', () => (
    <TabsRow items={[{ text: 'hello' }, { text: 'this' }, { text: 'is' }, { text: 'goodbye' }]} />
  ))

storiesOf('ToolbarButton', module)
  .addWithJSX('with label', () => <ToolbarButton icon={<PhotoCamera />} label="Camera" />)
  .addWithJSX('without label', () => <ToolbarButton icon={<PhotoCamera />} />)

const sources = (
  <React.Fragment>
    <source
      src="https://amp.dev/static/inline-examples/videos/kitten-playing.webm"
      type="video/webm"
    />
    <source
      src="https://amp.dev/static/inline-examples/videos/kitten-playing.mp4"
      type="video/mp4"
    />
  </React.Fragment>
)

storiesOf('Video', module)
  .addDecorator(wrapWithProvider())
  .addWithJSX('with defaults', () => <Video>{sources}</Video>)
  .addWithJSX('with src prop', () => (
    <Video src="https://amp.dev/static/inline-examples/videos/kitten-playing.webm" />
  ))
  .addWithJSX('with fixed width', () => <Video width="300">{sources}</Video>)
  .addWithJSX('with controls', () => <Video controls>{sources}</Video>)
  .addWithJSX('with poster', () => (
    <Video width="400" height="200" controls poster="https://placehold.it/400x200?text=Poster">
      {sources}
    </Video>
  ))
