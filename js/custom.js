// 首页功能增强
$(document).ready(function() {
  // 文章卡片动画
  $('.index-card').each(function(index) {
    $(this).css('animation-delay', (index * 0.1) + 's');
    $(this).addClass('animate__animated animate__fadeInUp');
  });
  
  // 图片懒加载
  $('.index-img').attr('loading', 'lazy');
  
  // 添加阅读时间估计
  $('.index-card .card-text').each(function() {
    var text = $(this).text();
    var words = text.trim().split(/\s+/).length;
    var readingTime = Math.ceil(words / 200); // 假设阅读速度为每分钟200字
    
    var timeHtml = '<span class="mr-3"><i class="far fa-clock"></i> ' + readingTime + ' 分钟</span>';
    $(this).closest('.index-card').find('.card-meta').append(timeHtml);
  });
  
  // 返回顶部按钮平滑滚动
  $('.scroll-top-arrow').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop: 0}, 600);
    return false;
  });
});


// 分类页面功能增强
$(document).ready(function() {
  // 添加分类统计信息
  var totalCategories = $('.category-card').length;
  var totalPosts = 0;
  $('.category-count').each(function() {
    totalPosts += parseInt($(this).text());
  });
  
  var statsHtml = '<div class="category-stats text-center mb-4">' +
                  '<span class="badge bg-primary me-2">分类总数: ' + totalCategories + '</span>' +
                  '<span class="badge bg-success">文章总数: ' + totalPosts + '</span>' +
                  '</div>';
  $('.category-container').prepend(statsHtml);
  
  // 添加分类导航
  var navHtml = '<div class="category-nav mb-4">' +
                '<div class="category-nav-item active" data-filter="all">全部</div>';
  
  $('.category-card .card-header').each(function() {
    var categoryName = $(this).text().split('(')[0].trim();
    navHtml += '<div class="category-nav-item" data-filter="' + categoryName + '">' + categoryName + '</div>';
  });
  
  navHtml += '</div>';
  $('.category-container').prepend(navHtml);
  
  // 分类筛选功能
  $('.category-nav-item').click(function() {
    $('.category-nav-item').removeClass('active');
    $(this).addClass('active');
    
    var filter = $(this).data('filter');
    if (filter === 'all') {
      $('.category-card').show();
    } else {
      $('.category-card').hide();
      $('.category-card').each(function() {
        var cardTitle = $(this).find('.card-header').text().split('(')[0].trim();
        if (cardTitle === filter) {
          $(this).show();
        }
      });
    }
  });
  
  // 展开更多文章功能
  $('.more-btn').click(function(e) {
    e.preventDefault();
    var $this = $(this);
    var $cardBody = $this.closest('.card-body');
    var $hiddenItems = $cardBody.find('.list-group-item.d-none');
    
    $hiddenItems.removeClass('d-none').addClass('fadeIn');
    $this.hide();
  });
});



// 页脚年份自动更新
document.addEventListener('DOMContentLoaded', function() {
  var copyrightYear = document.getElementById('copyright-year');
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }
});

// 计算网站运行时间
function runTime() {
  var startTime = new Date("2025-03-30"); // 替换为您的网站创建日期
  var currentTime = new Date();
  var runTime = currentTime - startTime;
  var days = Math.floor(runTime / (24 * 3600 * 1000));
  var hours = Math.floor((runTime % (24 * 3600 * 1000)) / (3600 * 1000));
  var minutes = Math.floor((runTime % (3600 * 1000)) / (60 * 1000));
  var seconds = Math.floor((runTime % (60 * 1000)) / 1000);
  
  document.getElementById("website-runtime").innerHTML = days + "天" + hours + "时" + minutes + "分" + seconds + "秒";
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  runTime();
  // 每秒更新一次
  setInterval(runTime, 1000);
});