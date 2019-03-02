import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTranslationList } from './store/actions';
import styles from './index.css';
import withStyle from '../../withStyle';

class Translation extends Component {


    render() {
        const { transList } = this.props;
        return (
            <div className={styles.container}>
               {
                   transList.map(item => {
                       return <div key={item.id} className={styles.item}>{item.title}</div>
                   }) 
               }
            </div>
        )
    }

    componentDidMount() {
        this.props.getTransList();
    }
}

const mapStateToProps = state => ({
    transList: state.translation.transList   
});

const mapDispatchToProps = dispatch => ({
    getTransList() {
        dispatch(getTranslationList());
    }
});

const ExportTranslation = connect(mapStateToProps, mapDispatchToProps)(withStyle(Translation, styles));

ExportTranslation.loadData = (store) => {
    // 负责在服务器端渲染之前，把这个路由需要的数据提前加载好
    return store.dispatch(getTranslationList())
}

export default ExportTranslation;