import Pagine from '../src/index';

function bootstrap() {
    beforeEach(() => {
        this.pagine = new Pagine({
            routes: [
                {
                    path: '/',
                    md: '## home page'                    
                },
                {
                    path: '/about',
                    md: '## about page'
                }
            ]
        });
    });
}

describe('Pagine', function() {
    

    describe('routing', function() {
        bootstrap.call(this, undefined);

        it('should create routes', () => {
            expect(this.pagine.router._routes.length).toBe(2);
        });
    });

    describe('markdown transformation', function() {
        bootstrap.call(this, undefined);
        
        it('should compile markdown to html', () => {
            const md = this.pagine.compileMarkdown('# hello');
            expect(md.html).toEqual('<h1 id=\"hello\">hello</h1>')
        })
    });

});