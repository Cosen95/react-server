import React, { Component } from 'react';
// 高阶组件
export default (DecoratedComponent, styles) => {
    return class NewComponent extends Component {
        componentWillMount() {
            if(this.props.staticContext) {
                this.props.staticContext.css.push(styles._getCss());
            }
        }

        render() {
            return <DecoratedComponent {...this.props} />
        }
    }
}