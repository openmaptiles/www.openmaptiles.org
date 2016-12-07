#!/bin/bash
set -o errexit
set -o nounset

LAYER_DOCS_DIR="${LAYER_DOCS_DIR:-_layers}"
LAYER_DIR="${LAYER_DIR:-../openmaptiles/layers}"
DIAGRAM_DIR="${DIAGRAM_DIR:-media}"


function generate_doc() {
    local layer_name="$1"
    local tileset="$LAYER_DIR/$layer_name/$layer_name.yaml"
    local target="$LAYER_DOCS_DIR/$layer_name.md"

    generate-etlgraph "$tileset" "$DIAGRAM_DIR"
    generate-mapping-graph "$tileset" "$DIAGRAM_DIR/mapping_$layer_name.png"

    echo '---' > $target
    echo 'layout: layer' >> $target
    echo "title: $layer_name" >> $target
    echo "etl_graph: $DIAGRAM_DIR/etl_$layer_name.png" >> $target
    echo "mapping_graph: $DIAGRAM_DIR/mapping_$layer_name.png" >> $target
    echo '---' >> $target

    generate-doc "$tileset" >> $target
    rm $DIAGRAM_DIR/*.dot
    rm $DIAGRAM_DIR/*.svg
}


function generate_docs() {
    mkdir -p "$LAYER_DOCS_DIR"
    mkdir -p "$DIAGRAM_DIR"
    generate_doc "aeroway"
    generate_doc "building"
    generate_doc "housenumber"
    generate_doc "landuse"
    generate_doc "place"
    generate_doc "transportation"
    generate_doc "water"
    generate_doc "waterway"
    generate_doc "boundary"
    generate_doc "landcover"
    generate_doc "park"
    generate_doc "poi"
    generate_doc "transportation_name"
    generate_doc "water_name"
}

generate_docs
