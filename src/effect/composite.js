module.exports = {
    'type' : 'compositor',
    'nodes' : [
        {
            'name': 'source',
            'type': 'texture',
            'outputs': {
                'color': {}
            }
        },
        {
            'name': 'source_half',
            'shader': '#source(qtek.compositor.downsample)',
            'inputs': {
                'texture': 'source'
            },
            'outputs': {
                'color': {
                    'parameters': {
                        'width': 'expr(width * 1.0 / 2)',
                        'height': 'expr(height * 1.0 / 2)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters' : {
                'textureSize': 'expr( [width * 1.0, height * 1.0] )'
            }
        },


        {
            'name' : 'bright',
            'shader' : '#source(qtek.compositor.bright)',
            'inputs' : {
                'texture' : 'source_half'
            },
            'outputs' : {
                'color' : {
                    'parameters' : {
                        'width' : 'expr(width * 1.0 / 2)',
                        'height' : 'expr(height * 1.0 / 2)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters' : {
                'threshold' : 2,
                'scale': 4,
                'textureSize': 'expr([width * 1.0 / 2, height / 2])'
            }
        },
        {
            'name' : 'bright2',
            'shader' : '#source(qtek.compositor.bright)',
            'inputs' : {
                'texture': 'source_half'
            },
            'outputs' : {
                'color' : {
                    'parameters' : {
                        'width' : 'expr(width * 1.0 / 2)',
                        'height' : 'expr(height * 1.0 / 2)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters' : {
                'threshold': 20,
                'scale': 0.01
            }
        },

        {
            'name': 'bright_downsample_4',
            'shader' : '#source(qtek.compositor.downsample)',
            'inputs' : {
                'texture' : 'bright'
            },
            'outputs' : {
                'color' : {
                    'parameters' : {
                        'width' : 'expr(width * 1.0 / 4)',
                        'height' : 'expr(height * 1.0 / 4)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters' : {
                'textureSize': 'expr( [width * 1.0 / 2, height / 2] )'
            }
        },
        {
            'name': 'bright_downsample_8',
            'shader' : '#source(qtek.compositor.downsample)',
            'inputs' : {
                'texture' : 'bright_downsample_4'
            },
            'outputs' : {
                'color' : {
                    'parameters' : {
                        'width' : 'expr(width * 1.0 / 8)',
                        'height' : 'expr(height * 1.0 / 8)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters' : {
                'textureSize': 'expr( [width * 1.0 / 4, height / 4] )'
            }
        },
        {
            'name': 'bright_downsample_16',
            'shader' : '#source(qtek.compositor.downsample)',
            'inputs' : {
                'texture' : 'bright_downsample_8'
            },
            'outputs' : {
                'color' : {
                    'parameters' : {
                        'width' : 'expr(width * 1.0 / 16)',
                        'height' : 'expr(height * 1.0 / 16)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters' : {
                'textureSize': 'expr( [width * 1.0 / 8, height / 8] )'
            }
        },
        {
            'name': 'bright_downsample_32',
            'shader' : '#source(qtek.compositor.downsample)',
            'inputs' : {
                'texture' : 'bright_downsample_16'
            },
            'outputs' : {
                'color' : {
                    'parameters' : {
                        'width' : 'expr(width * 1.0 / 32)',
                        'height' : 'expr(height * 1.0 / 32)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters' : {
                'textureSize': 'expr( [width * 1.0 / 16, height / 16] )'
            }
        },


        {
            'name' : 'bright_upsample_16_blur_h',
            'shader' : '#source(qtek.compositor.gaussian_blur)',
            'inputs' : {
                'texture' : 'bright_downsample_32'
            },
            'outputs' : {
                'color' : {
                    'parameters' : {
                        'width' : 'expr(width * 1.0 / 16)',
                        'height' : 'expr(height * 1.0 / 16)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters' : {
                'blurSize' : 1,
                'blurDir': 0.0,
                'textureSize': 'expr( [width * 1.0 / 32, height / 32] )'
            }
        },
        {
            'name' : 'bright_upsample_16_blur_v',
            'shader' : '#source(qtek.compositor.gaussian_blur)',
            'inputs' : {
                'texture' : 'bright_upsample_16_blur_h'
            },
            'outputs' : {
                'color' : {
                    'parameters' : {
                        'width' : 'expr(width * 1.0 / 16)',
                        'height' : 'expr(height * 1.0 / 16)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters' : {
                'blurSize' : 1,
                'blurDir': 1.0,
                'textureSize': 'expr( [width * 1.0 / 32, height * 1.0 / 32] )'
            }
        },



        {
            'name' : 'bright_upsample_8_blur_h',
            'shader' : '#source(qtek.compositor.gaussian_blur)',
            'inputs' : {
                'texture' : 'bright_downsample_16'
            },
            'outputs' : {
                'color' : {
                    'parameters' : {
                        'width' : 'expr(width * 1.0 / 8)',
                        'height' : 'expr(height * 1.0 / 8)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters' : {
                'blurSize' : 1,
                'blurDir': 0.0,
                'textureSize': 'expr( [width * 1.0 / 16, height * 1.0 / 16] )'
            }
        },
        {
            'name' : 'bright_upsample_8_blur_v',
            'shader' : '#source(qtek.compositor.gaussian_blur)',
            'inputs' : {
                'texture' : 'bright_upsample_8_blur_h'
            },
            'outputs' : {
                'color' : {
                    'parameters' : {
                        'width' : 'expr(width * 1.0 / 8)',
                        'height' : 'expr(height * 1.0 / 8)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters' : {
                'blurSize' : 1,
                'blurDir': 1.0,
                'textureSize': 'expr( [width * 1.0 / 16, height * 1.0 / 16] )'
            }
        },
        {
            'name' : 'bright_upsample_8_blend',
            'shader' : '#source(qtek.compositor.blend)',
            'inputs' : {
                'texture1' : 'bright_upsample_8_blur_v',
                'texture2' : 'bright_upsample_16_blur_v'
            },
            'outputs' : {
                'color' : {
                    'parameters' : {
                        'width' : 'expr(width * 1.0 / 8)',
                        'height' : 'expr(height * 1.0 / 8)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters' : {
                'weight1' : 0.3,
                'weight2' : 0.7
            }
        },


        {
            'name' : 'bright_upsample_4_blur_h',
            'shader' : '#source(qtek.compositor.gaussian_blur)',
            'inputs' : {
                'texture' : 'bright_downsample_8'
            },
            'outputs' : {
                'color' : {
                    'parameters' : {
                        'width' : 'expr(width * 1.0 / 4)',
                        'height' : 'expr(height * 1.0 / 4)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters' : {
                'blurSize' : 1,
                'blurDir': 0.0,
                'textureSize': 'expr( [width * 1.0 / 8, height * 1.0 / 8] )'
            }
        },
        {
            'name' : 'bright_upsample_4_blur_v',
            'shader' : '#source(qtek.compositor.gaussian_blur)',
            'inputs' : {
                'texture' : 'bright_upsample_4_blur_h'
            },
            'outputs' : {
                'color' : {
                    'parameters' : {
                        'width' : 'expr(width * 1.0 / 4)',
                        'height' : 'expr(height * 1.0 / 4)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters' : {
                'blurSize' : 1,
                'blurDir': 1.0,
                'textureSize': 'expr( [width * 1.0 / 8, height * 1.0 / 8] )'
            }
        },
        {
            'name' : 'bright_upsample_4_blend',
            'shader' : '#source(qtek.compositor.blend)',
            'inputs' : {
                'texture1' : 'bright_upsample_4_blur_v',
                'texture2' : 'bright_upsample_8_blend'
            },
            'outputs' : {
                'color' : {
                    'parameters' : {
                        'width' : 'expr(width * 1.0 / 4)',
                        'height' : 'expr(height * 1.0 / 4)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters' : {
                'weight1' : 0.3,
                'weight2' : 0.7
            }
        },





        {
            'name' : 'bright_upsample_2_blur_h',
            'shader' : '#source(qtek.compositor.gaussian_blur)',
            'inputs' : {
                'texture' : 'bright_downsample_4'
            },
            'outputs' : {
                'color' : {
                    'parameters' : {
                        'width' : 'expr(width * 1.0 / 2)',
                        'height' : 'expr(height * 1.0 / 2)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters' : {
                'blurSize' : 1,
                'blurDir': 0.0,
                'textureSize': 'expr( [width * 1.0 / 4, height * 1.0 / 4] )'
            }
        },
        {
            'name' : 'bright_upsample_2_blur_v',
            'shader' : '#source(qtek.compositor.gaussian_blur)',
            'inputs' : {
                'texture' : 'bright_upsample_2_blur_h'
            },
            'outputs' : {
                'color' : {
                    'parameters' : {
                        'width' : 'expr(width * 1.0 / 2)',
                        'height' : 'expr(height * 1.0 / 2)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters' : {
                'blurSize' : 1,
                'blurDir': 1.0,
                'textureSize': 'expr( [width * 1.0 / 4, height * 1.0 / 4] )'
            }
        },
        {
            'name' : 'bright_upsample_2_blend',
            'shader' : '#source(qtek.compositor.blend)',
            'inputs' : {
                'texture1' : 'bright_upsample_2_blur_v',
                'texture2' : 'bright_upsample_4_blend'
            },
            'outputs' : {
                'color' : {
                    'parameters' : {
                        'width' : 'expr(width * 1.0 / 2)',
                        'height' : 'expr(height * 1.0 / 2)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters' : {
                'weight1' : 0.3,
                'weight2' : 0.7
            }
        },



        {
            'name' : 'bright_upsample_full_blur_h',
            'shader' : '#source(qtek.compositor.gaussian_blur)',
            'inputs' : {
                'texture' : 'bright'
            },
            'outputs' : {
                'color' : {
                    'parameters' : {
                        'width' : 'expr(width * 1.0)',
                        'height' : 'expr(height * 1.0)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters' : {
                'blurSize' : 1,
                'blurDir': 0.0,
                'textureSize': 'expr( [width * 1.0 / 2, height * 1.0 / 2] )'
            }
        },
        {
            'name' : 'bright_upsample_full_blur_v',
            'shader' : '#source(qtek.compositor.gaussian_blur)',
            'inputs' : {
                'texture' : 'bright_upsample_full_blur_h'
            },
            'outputs' : {
                'color' : {
                    'parameters' : {
                        'width' : 'expr(width * 1.0)',
                        'height' : 'expr(height * 1.0)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters' : {
                'blurSize' : 1,
                'blurDir': 1.0,
                'textureSize': 'expr( [width * 1.0 / 2, height * 1.0 / 2] )'
            }
        },
        {
            'name' : 'bloom_composite',
            'shader' : '#source(qtek.compositor.blend)',
            'inputs' : {
                'texture1' : 'bright_upsample_full_blur_v',
                'texture2' : 'bright_upsample_2_blend'
            },
            'outputs' : {
                'color' : {
                    'parameters' : {
                        'width' : 'expr(width * 1.0)',
                        'height' : 'expr(height * 1.0)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters' : {
                'weight1' : 0.3,
                'weight2' : 0.7
            }
        },


        {
            'name': 'coc',
            'shader': '#source(qtek.compositor.dof.coc)',
            'outputs': {
                'color': {
                    'parameters': {
                        'minFilter': 'NEAREST',
                        'magFilter': 'NEAREST',
                        'width': 'expr(width * 1.0)',
                        'height': 'expr(height * 1.0)'
                    }
                }
            },
            'parameters': {
                'focalDist': 50,
                'focalRange': 30
            }
        },

        {
            'name': 'dof_far_blur',
            'shader': '#source(ecgl.dof.diskBlur)',
            'inputs': {
                'texture': 'source',
                'coc': 'coc'
            },
            'outputs': {
                'color': {
                    'parameters': {
                        'width': 'expr(width * 1.0)',
                        'height': 'expr(height * 1.0)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters': {
                'textureSize': 'expr( [width * 1.0, height * 1.0] )'
            }
        },
        {
            'name': 'dof_near_blur',
            'shader': '#source(ecgl.dof.diskBlur)',
            'inputs': {
                'texture': 'source',
                'coc': 'coc'
            },
            'outputs': {
                'color': {
                    'parameters': {
                        'width': 'expr(width * 1.0)',
                        'height': 'expr(height * 1.0)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters': {
                'textureSize': 'expr( [width * 1.0, height * 1.0] )'
            },
            'defines': {
                'BLUR_NEARFIELD': null
            }
        },


        {
            'name': 'dof_coc_blur',
            'shader': '#source(ecgl.dof.diskBlur)',
            'inputs': {
                'texture': 'coc'
            },
            'outputs': {
                'color': {
                    'parameters': {
                        'minFilter': 'NEAREST',
                        'magFilter': 'NEAREST',
                        'width': 'expr(width * 1.0)',
                        'height': 'expr(height * 1.0)'
                    }
                }
            },
            'parameters': {
                'textureSize': 'expr( [width * 1.0, height * 1.0] )'
            },
            'defines': {
                'BLUR_COC': null
            }
        },

        {
            'name': 'dof_composite',
            'shader': '#source(qtek.compositor.dof.composite)',
            'inputs': {
                'original': 'source',
                'blurred': 'dof_far_blur',
                'nearfield': 'dof_near_blur',
                'coc': 'coc',
                'nearcoc': 'dof_coc_blur'
            },
            'outputs': {
                'color': {
                    'parameters': {
                        'width': 'expr(width * 1.0)',
                        'height': 'expr(height * 1.0)',
                        'type': 'HALF_FLOAT'
                    }
                }
            }
        },

        {
            'name' : 'lensflare',
            'shader' : '#source(qtek.compositor.lensflare)',
            'inputs' : {
                'texture' : 'bright2'
            },
            'outputs' : {
                'color' : {
                    'parameters' : {
                        'width' : 'expr(width * 1.0 / 2)',
                        'height' : 'expr(height * 1.0 / 2)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters' : {
                'textureSize' : 'expr([width * 1.0 / 2, height * 1.0 / 2])',
                'lensColor' : '#lenscolor'
            }
        },
        {
            'name' : 'lensflare_blur_h',
            'shader' : '#source(qtek.compositor.gaussian_blur)',
            'inputs' : {
                'texture' : 'lensflare'
            },
            'outputs' : {
                'color' : {
                    'parameters' : {
                        'width' : 'expr(width * 1.0 / 2)',
                        'height' : 'expr(height * 1.0 / 2)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters' : {
                'blurSize' : 1,
                'blurDir': 0.0,
                'textureSize' : 'expr([width * 1.0 / 2, height * 1.0 / 2])'
            }
        },
        {
            'name' : 'lensflare_blur_v',
            'shader' : '#source(qtek.compositor.gaussian_blur)',
            'inputs' : {
                'texture' : 'lensflare_blur_h'
            },
            'outputs' : {
                'color' : {
                    'parameters' : {
                        'width' : 'expr(width * 1.0 / 2)',
                        'height' : 'expr(height * 1.0 / 2)',
                        'type': 'HALF_FLOAT'
                    }
                }
            },
            'parameters' : {
                'blurSize' : 1,
                'blurDir': 1.0,
                'textureSize' : 'expr([width * 1.0 / 2, height * 1.0 / 2])'
            }
        },
        {
            'name' : 'composite',
            'shader' : '#source(qtek.compositor.hdr.composite)',
            'inputs' : {
                'texture': 'source',
                'bloom' : 'bloom_composite'
            },
            'defines': {
                'PREMULTIPLY_ALPHA': null
            }
        },
        {
            'name': 'edge',
            'shader':'#source(ecgl.edge)',
            'inputs': {
                'texture': 'composite'
            },
            'parameters': {
                'textureSize' : 'expr([width * 1.0, height * 1.0])'
            }
        },
        {
            'name' : 'FXAA',
            'shader' : '#source(qtek.compositor.fxaa)',
            'inputs' : {
                'texture' : 'composite'
            }
        }
    ]
};