import React from "react"
import { Link } from "gatsby"

import Page from "../../components/Page/Page"
import SEO from "../../components/seo"
import Divider from '../../components/Divider';

import TextTable from './components/TextTable';
import ColorTable from './components/ColorTable';
import GridDemo from './components/GridDemo';

const StyleGuide = () => (
  <Page>
    <SEO title="Style Guide" />
    <div className="row">
      <div className="col-10 col-offset-1">
        <h1 className="bold serif">Style Guide</h1>
        <p>The core styles of this website are displayed here for testing and auditing purposes.</p>
        <div className="stack__item--4">
          <Divider weight="heavy" />
        </div>
        <h3 className="serif bold">Typography</h3>
        <p className="serif">There are three typographic styles. <span className="serif">Serif,</span> <span>Sans Serif</span> and <span className="monospace">Monospace</span>.</p>
        <div className="stack__children--9 stack__item--6">
          <div>
            <h4 className="serif">Serif</h4>
            <TextTable font="serif" />
          </div>
          <Divider />
          <div>
            <h4>Sans Serif</h4>
            <TextTable font="sans-serif" />
          </div>
          <Divider />
          <div>
            <h4 className="monospace">Monospace</h4>
            <TextTable font="monospace" />
          </div>
        </div>
        <div className="stack__item--4">
          <Divider weight="heavy" />
        </div>
        <h3 className="serif bold">Colors</h3>
        <p className="serif">There are five primary colors in the color scheme, set in three different shades.</p>
        <div className="stack__item--6">
          <ColorTable />
        </div>
        <div className="stack__item--4">
          <Divider weight="heavy" />
        </div>
        <h3 className="serif bold">Grid</h3>
        <p className="serif">A basic 12 column grid is used for layout. For mobile, this grid is simplified to a 6 column grid.</p>
        <GridDemo />
      </div>
    </div>
  </Page>
)

export default StyleGuide
