# Geoplatform Clipboard Extension

## Usage

### Storage Format

```
Name: ckan_clipboard
Value: {
    "resources": [{
        "id":     "<resource_id>",
        "name":   "<package_title>",
        "format": "<resource_format>"
    },{...}]
}
```

## Requirements

* CKAN v2.2
* Twitter Bootstrap v2.x

## Installation

```
(pyenv)$ python setup.py develop
```

Then add `clipboard` to plugin settings:

```
ckan.plugins = [...] clipboard
```

## License

This extension is open and licensed under the GNU Affero General Public License (AGPL) v3.0 whose full text may be found at:

http://www.fsf.org/licensing/licenses/agpl-3.0.html
