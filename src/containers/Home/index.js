import React, { Component } from 'react';
import Header from '../../components/Header';
import { connect } from 'react-redux';
import { getHomeList } from './store/actions';

class Home extends Component {

    getList() {
        const { list } = this.props;
        return list.map(item => <div key={item.id}>{item.title}</div> )
    }

    render() {
        return (
            <div>
                <Header />
                <div>{this.props.name}</div>
                {
                    this.getList()
                }
                <button onClick={() => {alert('click1')}}>点击我</button>
            </div>
        )
    }

    componentDidMount() {
        this.props.getHomeList();
    }
}

Home.loadData = (store) => {
    // 负责在服务器端渲染之前，把这个路由需要的数据提前加载好
    return store.dispatch(getHomeList())
}

const mapStateToProps = state => ({
    name: state.home.name,
    list: state.home.newsList
});

const mapDispatchToProps = dispatch => ({
    getHomeList() {
        dispatch(getHomeList());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);