$(function () {
  axios({
    url: 'js/news.json'
  }).then(result => {
    const pageSize = 250; // 每页显示的数量
    let currentPage = 1; // 当前页码

    // 根据页码显示新闻列表
    function newNews(page) {
      currentPage = page;
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = Math.min(startIndex + pageSize - 1, result.data.length);
      const dataList = result.data.slice(startIndex, endIndex).map(item => {
        // 将标签字符串拆分成数组，确保即使tag为undefined也不会出错
        const tags = (item.tag || '').split(',').filter(tag => tag.trim() !== '');
        
        // 生成标签HTML
        const tagsHTML = tags.map(function(tag) { 
          return `<span class="tag">${tag.trim()}</span>`;
        }).join('');
        
        return `
        <div class='box'>
          <a href="javascript:;">
            <div class='aBox'>
              <img src="${item.images}" alt="">
            </div>
          </a>
          <div class="right">
            <h2>${item.title}</></h2>
            <span>${item.time}</span>
            <p>${item.paragraph}</p>
            <div class="tags-container">
              ${tagsHTML}
            </div>
          </div>
        </div>
      `}).join("");
      
      $(".container").html(dataList);
      // 生成分页HTML并更新页面
      const paginationHTML = newPageHTML(result.data.length, pageSize, currentPage);
      $(".pagination").html(paginationHTML);
      alert(".previousPage", 1, '已经是第一页拉~', true);
      alert(".nextPage", Math.ceil(result.data.length / pageSize), '已经是最后一页拉~', false);
    }
    
    function alert(el, num, alertMessage, isSuccess) {
      $(document).on("click", el, function () {
        if (currentPage === num) {
          console.log(currentPage);
        }
      });
    }
    
    // 初始化分页和新闻列表
    newNews(currentPage);
    
    // 点击页码链接切换页码
    $(".pagination").on("click", ".a", function () {
      const page = $(this).text();
      currentPage = page === "首页" ? 1 :
        page === "尾页" ? Math.ceil(result.data.length / pageSize) :
          page === "上一页" ? Math.max(currentPage - 1, 1) :
            page === "下一页" ? Math.min(currentPage + 1, Math.ceil(result.data.length / pageSize)) :
              parseInt(page);
      newNews(currentPage);
    });
  });
});