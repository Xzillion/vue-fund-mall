/**
 * 组件透传,可配置已有组件类型
 */
const config = {
    client1: {
        ButtomBar:      require('./components/ButtomBar/Default.vue'),
        TitleBar:       require('./components/TitleBar/Default.vue'),
        KeyboardView:   require('./components/KeyboardView/Default.vue'),
        PasswordView:   require('./components/PasswordView/Default.vue'),        
        List:           require('./components/List/Default.vue'),
        EmptyView:      require('./components/EmptyView/Default.vue'),
        ActionSheet:    require('./components/ActionSheet/Default.vue'),
        LineCell:       require('./components/LineCell/Default.vue'),
        DealResult:     require('./components/DealResult/Default.vue'),
        ScoreBar:       require('./components/ScoreBar/Default.vue'),
        Toast:          require('./components/Toast/Default.vue'),
        Loading:        require('./components/Loading/Default.vue'),
        Alert:          require('./components/Alert/Default.vue'),
        Confirm:        require('./components/Confirm/Default.vue')        
    },
    client2: {
        
    }
}

export default config