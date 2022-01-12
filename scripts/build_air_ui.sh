#!/bin/bash

. scripts/tools.sh

image_name=${1:?}
image_tag=${2:?}
image_url=${3:?}
target_name=${4}

readonly local_image_tag="local_image_tag"
readonly docker_file="Dockerfile"

build_image "${image_name}" "${local_image_tag}" "${image_url}" "${docker_file}" "${target_name}"

tag_image "${image_name}" "${local_image_tag}" "${image_name}" "${image_tag}" "${image_url}"