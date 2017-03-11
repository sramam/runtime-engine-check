const expect = require('chai').expect
const semver = require('semver')
const engineCheck = require('..')

const pkgGen = function (ver) {
  return {
    name: 'junk',
    version: '1.0.0',
    description: '',
    main: 'index.js',
    scripts: {
      test: 'echo "Error: no test specified" && exit 1'
    },
    keywords: [],
    author: '',
    license: 'ISC',
    engines: {
      node: ver
    }
  }
}

describe('check-node-engines', () => {
  it('match', () => {
    const desired = semver.clean(process.version)
    const pkg = pkgGen('>=' + desired)
    const ver = engineCheck(null, pkg)
    expect(desired).to.equal(ver)
  })

  it('mismatch', () => {
    expect(() => {
      const desired = semver.inc(semver.clean(process.version), 'major')
      const pkg = pkgGen('>' + desired)
      engineCheck(null, pkg)
    }).to.throw()
  })

  it('default check', () => {
    const ver = engineCheck()
    expect(ver).to.equal(semver.clean(process.version))
  })
})
