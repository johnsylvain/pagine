import Pagine from '../lib/pagine.js';

function bootstrap() {
  beforeEach(() => {
    this.pagine = new Pagine({
      routes: [
        {
          path: '/home',
          md: '## home page',
          layout: 'main'
        },
        {
          path: '/about',
          md: '## about page',
          layout: 'main'
        }
      ]
    });
  });

  document.body.innerHTML = `
    <div id="main">
      <%= content %>
    </div>
  `
}

describe('Pagine', function() {


  describe('routing', function() {
    bootstrap.call(this);

    it('should create routes', () => {
      expect(this.pagine.router._routes.length).toBe(2);
    });
  });

  describe('markdown transformation', function() {
    bootstrap.call(this);

    it('should compile markdown to html', () => {
      const md = this.pagine.compileMarkdown('# hello');
      expect(md).toEqual('<h1>hello</h1>')
    })
  });

});
