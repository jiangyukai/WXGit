Page({

  data: {
    loading: false,
    loadtxt: '正在加载',
    currentId: '1001',
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    RollLink: [],
    AvatorText: [],
    newList: [],
    section: [
      { name: '时政', id: '1001' }, { name: '解读', id: '1032' },
      { name: '视点', id: '1003' }, { name: '交易', id: '1004' },
      { name: '质价标准', id: '1005' }, { name: '质价标准', id: '1006' },
      { name: '质价标准', id: '1007' }, { name: '质价标准', id: '1008' }
    ]
  },

  handleTap: function (e) {

    console.log(e);
    let id = e.currentTarget.id;

    if (id) {
      this.setData({ currentId: id })
      this.onLoad();
    }

  }


    
})