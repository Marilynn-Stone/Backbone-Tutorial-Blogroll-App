// Backbone Model

const Blog = Backbone.Model.extend({
  defauls: {
    author: "",
    title: "",
    url: ""
  }
})

// Backbone Collection

const Blogs = Backbone.Collection.extend({});

// Instantiate two Blogs

// const blog1 = new Blog({
//   author: 'Marilynn',
//   title: 'Marilynn\'s Blog',
//   url: 'http://blog.com'
// });

// const blog2 = new Blog({
//   author: 'Robin',
//   title: 'Robin\'s Blog',
//   url: 'http://blogger.com'
// });

// Instantiate a collection

const blogs = new Blogs();

// Backbone view for one Blog

const BlogView = Backbone.View.extend({
  model: new Blog(),
  tagName: 'tr',
  initialize: function() {
    this.template = _.template($('.blogs-list-template').html());
  },
  render: function()  {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

// Backbone view for all Blogs

const BlogsView = Backbone.View.extend({
  model: blogs,
  el: $(".blogs-list"),
  initialize: function() {
    this.model.on('add', this.render, this);
  },
  render: function() {
    const self = this;
    this.$el.html('');
    _.each(this.model.toArray(), function(blog) {
      self.$el.append((new BlogView({model: blog})).render().$el);
    });
    return this;
  }
});

const blogsView = new BlogsView();

$(document).ready(function() {
  $('.add-blog').on('click', function() {
    const blog = new Blog({
      author: $('.author-input').val(),
      title: $('.title-input').val(),
      url: $('.url-input').val()
    });
    $('.author-input').val('');
    $('.title-input').val('');
    $('.url-input').val('');
    console.log(blog.toJSON());
    blogs.add(blog);
  })
})