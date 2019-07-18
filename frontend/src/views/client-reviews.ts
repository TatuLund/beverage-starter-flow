import { LitElement, html, css, customElement, property } from 'lit-element';
import { render } from 'lit-html';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-grid/vaadin-grid-filter-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-filter.js';
import '@vaadin/vaadin-grid/vaadin-grid-sorter.js';

import * as ProductEndpoint from '../generated/ProductEndpoint';
import Product from '../generated/com/vaadin/polyglotdx/data/Product';

@customElement('product-list-view')
export class ClientReviews extends LitElement {
  @property() items: Product[] = [];

  render() {
    return html`
      <h1>Product List</h1>
      <vaadin-grid .items="${this.items}" multi-sort>
        <vaadin-grid-sort-column
          path="productName"
          header="Product"
        ></vaadin-grid-sort-column>
        <vaadin-grid-sort-column
          text-align="end"
          path="productPrice"
          header="Price"
          .renderer="${this.priceRenderer}"
        ></vaadin-grid-sort-column>
        <vaadin-grid-sort-column
          path="glutenFree"
          header="Gluten Free"
        ></vaadin-grid-sort-column>
        <vaadin-grid-sort-column
          path="lactoseFree"
          header="Lactose Free"
        ></vaadin-grid-sort-column>
      </vaadin-grid>
    `;
  }

  async firstUpdated() {
    this.items = (await ProductEndpoint.list()) as Product[];
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      padding: var(--lumo-space-m);
      height: calc(100% - 2 * var(--lumo-space-m));
    }
  `;

  priceRenderer(root: Element | DocumentFragment, _: any, rowData: any) {
    const price = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(rowData.item.productPrice / 100);
    return render(
      html`
        ${price}
      `,
      root
    );
  }
}
