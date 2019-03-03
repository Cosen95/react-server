import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Header from '../../components/Header';
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
            <Fragment>
                <Helmet>
                    <title>jack-cool的ssr项目首页</title>
                    <meta name="description" content="ssr初尝" />
                </Helmet>
                <div className={styles.container}>
                    {
                        this.getList()
                    }
                </div>
            </Fragment>    
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