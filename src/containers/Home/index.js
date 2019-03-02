import React, { Component } from 'react';
import Header from '../../components/Header';
import { connect } from 'react-redux';
import { getHomeList } from './store/actions';
import styles from './index.css'
import withStyle from '../../withStyle';

class Home extends Component {

    getList() {
        const { list } = this.props;
        return list.map(item => <div key={item.id} className={styles.item}>{item.title}</div> )
    }

    render() {
        return (
            <div className={styles.container}>
                {
                    this.getList()
                }
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

const ExportHome = connect(mapStateToProps, mapDispatchToProps)(withStyle(Home, styles));

ExportHome.loadData = (store) => {
    // 负责在服务器端渲染之前，把这个路由需要的数据提前加载好
    return store.dispatch(getHomeList())
}

export default ExportHome;