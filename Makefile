all:

dev:
	npx parcel serve -p 7031 src/index.html

build: clean
	npx parcel build -d dist/ --no-autoinstall --public-url=${PUBLIC_DOMAIN} src/index.html

clean:
	rm -rf dist/
