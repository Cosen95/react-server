import React, { Component } from 'react';
import Header from '../../components/Header';
import { connect } from 'react-redux';
import { getHomeList } from './store/actions';
import styles from './index.css'
class Home extends Component {

    componentWillMount() {
        if(this.props.staticContext) {
            this.props.staticContext.css.push(styles._getCss());
        }
    }

    getList() {
        const { list } = this.props;
        return list.map(item => <div key={item.id}>{item.title}</div> )
    }

    render() {
        return (
            <div>
                <div>{this.props.name}</div>
                {
                    this.getList()
                }
                <button onClick={() => {alert('click1')}}>点击我</button>
            </div>
        )
    }

    componentDidMount() {
        if(!this.props.list.length) {
            this.props.getHomeList();
        }
    }
}

const mapStateToProps = state => ({
    name: state.home.name,
    list: state.home.newsList
});

const mapDispatchToProps = dispatch => ({
    getHomeList() {
        dispatch(getHomeList());
    }
});

const ExportHome = connect(mapStateToProps, mapDispatchToProps)(Home);

ExportHome.loadData = (store) => {
    // 负责在服务器端渲染之前，把这个路由需要的数据提前加载好
    return store.dispatch(getHomeList())
}

export default ExportHome;