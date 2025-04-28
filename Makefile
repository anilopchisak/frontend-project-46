install:
	npx ci

gendiff:
	node gendiff.js $(filepath1) $(filepath2)

test:
	npm test

test-coverage:
	npm test -- --coverage

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

publish:
	npm publish --dry-run

.PHONY: test