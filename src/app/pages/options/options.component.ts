import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'options',
  encapsulation: ViewEncapsulation.Emulated,
  styles: [require('./options.scss')],
  template: require('./options.html'),
})
export class Options {

  public isChecked = false;

  public defaultThumb = 'assets/img/theme/no-photo.png';
  public uploaderOptions:any = {
    // url: 'http://website.com/upload'
  };

  private nodes = [
    {
      id: 1,
      name: '首页',
      children: [
        { id: 2, name: '最新' },
        { id: 3, name: '最热' }
      ]
    }, {
      id: 4,
      name: 'Code',
      children: [
        { id: 5, name: '架构' },
        {
          id: 6,
          name: '语言',
          children: [
            { id: 7, name: 'subsub' },
            { id: 7, name: 'subsub' }
          ]
        }
      ]
    }, {
      id: 7,
      name: 'Theme',
      children: [
        { id: 8, name: 'child2.1' },
        {
          id: 9,
          name: 'child2.2',
          children: [
            { id: 10, name: 'subsub' }
          ]
        }
      ]
    }, {
      id: 11,
      name: 'Code',
      children: [
        { id: 12, name: 'child2.1' },
        {
          id: 13,
          name: 'child2.2',
          children: [
            { id: 14, name: 'subsub' }
          ]
        }
      ]
    }
  ];

  private options = {
    allowDrag: true,
    actionMapping: {
      mouse: {
        drop: (tree:TreeModel, node:TreeNode, $event:any, to:{ node:TreeNode, index: number }) => {
          // use tree.getDragNode() to get the current dragged node (parent & index)
          // use to.node and to.index to get the parent node and index of drop location
          // use TREE_ACTIONS.MOVE_NODE to invoke the original action
        }
      }
    }
  };

  onMoveNode($event) {
    console.log(
      "Moved",
      $event.node.data.name,
      "to",
      $event.to.node.data.name,
      "at index",
      $event.to.index);
  }

}
