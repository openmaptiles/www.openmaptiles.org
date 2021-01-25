#!/bin/bash
set -o errexit
set -o nounset

# Run from root of OpenMapTiles project.
LAYER_DOCS_DIR="${LAYER_DOCS_DIR:-./docs/layers}"
LAYER_DIR="${LAYER_DIR:-./layers}"
DIAGRAM_DIR="${DIAGRAM_DIR:-./docs/media}"


function generate_doc() {
    local layer_name="$1"
    local tileset="$LAYER_DIR/$layer_name/$layer_name.yaml"
    local target="$LAYER_DOCS_DIR/$layer_name.md"

    docker-compose run --rm openmaptiles-tools sh -c \
			"generate-etlgraph $tileset $DIAGRAM_DIR && \
			 generate-mapping-graph $tileset $DIAGRAM_DIR/mapping_$layer_name"
    echo '---' > $target
    echo 'layout: page' >> $target
    echo 'category: layer' >> $target
    echo "title: $layer_name" >> $target
    echo "etl_graph: $DIAGRAM_DIR/etl_$layer_name.png" >> $target
    echo "mapping_graph: $DIAGRAM_DIR/mapping_$layer_name.png" >> $target

    local zoom='14'
    sql=$(docker-compose run --rm openmaptiles-tools sh -c "generate-sqlquery $tileset $zoom")
    echo "sql_query: $sql" >> $target
    echo '---' >> $target

    docker-compose run --rm openmaptiles-tools sh -c "generate-doc $tileset" >> $target
    find $DIAGRAM_DIR -type f ! -iname "*.png" -delete
}


function generate_docs() {
    mkdir -p "$LAYER_DOCS_DIR"
    mkdir -p "$DIAGRAM_DIR"
    generate_doc "aerodrome_label"
    generate_doc "aeroway"
    generate_doc "boundary"
    generate_doc "building"
    generate_doc "housenumber"
    generate_doc "landcover"
    generate_doc "landuse"
    generate_doc "mountain_peak"
    generate_doc "park"
    generate_doc "place"
    generate_doc "poi"
    generate_doc "transportation"
    generate_doc "transportation_name"
    generate_doc "water"
    generate_doc "water_name"
    generate_doc "waterway"
}

generate_docs
