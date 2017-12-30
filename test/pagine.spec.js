import Pagine from '../src'

const $ = document.querySelectorAll.bind(document);
NodeList.prototype.first = function() {
  return this[0];
}

function bootstrap() {
  beforeEach(() => {
    this.pagine = new Pagine({
      view: '#view',
      routes: [
        {
          path: '/home',
          md: '## home page',
          layout: '#main'
        },
        {
          path: '/about',
          md: '## about page',
          layout: '#main'
        }
      ]
    });
    document.body.innerHTML = `
      <div id="view"></div>
      <script type="text/html" id="main">
        <%= content %>
      </script>
    `
  });

}

describe('Pagine module', function() {


  describe('router', function() {
    bootstrap.call(this);

    it('should create routes', () => {
      // # of routes + 404 route
      expect(Object.keys(this.pagine.router.routes).length).toBe(2);
    });
  });

  describe('markdown transformation', function() {
    bootstrap.call(this);

    it('should compile markdown to html', () => {
      const md = this.pagine.compileMarkdown('# hello');
      expect(md.trim()).toEqual('<h1>hello</h1>')
    })
  });

  describe('view rendering', () => {
    bootstrap.call(this);

    it('should compile template into view', () => {
      this.pagine.setContent('main', 'https://pastebin.com/raw/rrE3RU3T')
        .then((res) => {
          var output = $('#view').first().innerHTML.trim()
          expect(output).toBe('<h1>test markdown</h1>');
        })
    });

    /*
     * TODO: Fix this unit test to change URL location
     */
    // it('should change view content on route change', () => {
    //   var output;

    //   window.location.url = '#/home';
    //   output = $('#view').first().innerHTML.trim()
    //   expect(output).toBe('<h2>home page</h2>');

    //   window.location.url = '#/about';
    //   output = $('#view').first().innerHTML.trim()
    //   expect(output).toBe('<h2>about page</h2>')
    // });
  })

});
