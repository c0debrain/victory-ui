/* ============================================================
 * File: config.lazyload.js
 * Configure modules for ocLazyLoader. These are grouped by
 * vendor libraries.
 * ============================================================ */

angular.module('app')
    .config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            debug: true,
            events: true,
            modules: [{
                    name: 'isotope',
                    files: [
                        'plugins/imagesloaded/imagesloaded.pkgd.min.js',
                        'plugins/jquery-isotope/isotope.pkgd.min.js'
                    ]
                }, {
                    name: 'codropsDialogFx',
                    files: [
                        'plugins/codrops-dialogFx/dialogFx.js',
                        'plugins/codrops-dialogFx/dialog.css',
                        'plugins/codrops-dialogFx/dialog-sandra.css'
                    ]
                }, {
                    name: 'metrojs',
                    files: [
                        'plugins/jquery-metrojs/MetroJs.min.js',
                        'plugins/jquery-metrojs/MetroJs.css'
                    ]
                }, {
                    name: 'owlCarousel',
                    files: [
                        'plugins/owl-carousel/owl.carousel.min.js',
                        'plugins/owl-carousel/assets/owl.carousel.css'
                    ]
                }, {
                    name: 'noUiSlider',
                    files: [
                        'plugins/jquery-nouislider/jquery.nouislider.min.js',
                        'plugins/jquery-nouislider/jquery.liblink.js',
                        'plugins/jquery-nouislider/jquery.nouislider.css'
                    ]
                }, {
                    name: 'nvd3',
                    files: [
                        'plugins/nvd3/lib/d3.v3.js',
                        'plugins/nvd3/nv.d3.min.js',
                        'plugins/nvd3/src/utils.js',
                        'plugins/nvd3/src/tooltip.js',
                        'plugins/nvd3/src/interactiveLayer.js',
                        'plugins/nvd3/src/models/axis.js',
                        'plugins/nvd3/src/models/line.js',
                        'plugins/nvd3/src/models/lineWithFocusChart.js',
                        'plugins/angular-nvd3/angular-nvd3.js',
                        'plugins/nvd3/nv.d3.min.css'
                    ],
                    serie: true // load in the exact order
                }, {
                    name: 'rickshaw',
                    files: [
                        'plugins/nvd3/lib/d3.v3.js',
                        'plugins/rickshaw/rickshaw.min.js',
                        'plugins/angular-rickshaw/rickshaw.js',
                        'plugins/rickshaw/rickshaw.min.css',
                    ],
                    serie: true
                }, {
                    name: 'sparkline',
                    files: [
                        'plugins/jquery-sparkline/jquery.sparkline.min.js',
                        'plugins/angular-sparkline/angular-sparkline.js'
                    ]
                }, {
                    name: 'mapplic',
                    files: [
                        'plugins/mapplic/js/hammer.js',
                        'plugins/mapplic/js/jquery.mousewheel.js',
                        'plugins/mapplic/js/mapplic.js',
                        'plugins/mapplic/css/mapplic.css'
                    ]
                }, {
                    name: 'skycons',
                    files: ['plugins/skycons/skycons.js']
                }, {
                    name: 'switchery',
                    files: [
                        'plugins/switchery/js/switchery.min.js',
                        'plugins/ng-switchery/ng-switchery.js',
                        'plugins/switchery/css/switchery.min.css',
                    ]
                }, {
                    name: 'menuclipper',
                    files: [
                        'plugins/jquery-menuclipper/jquery.menuclipper.css',
                        'plugins/jquery-menuclipper/jquery.menuclipper.js'
                    ]
                }, {
                    name: 'wysihtml5',
                    files: [
                        'plugins/bootstrap3-wysihtml5/bootstrap3-wysihtml5.min.css',
                        'plugins/bootstrap3-wysihtml5/bootstrap3-wysihtml5.all.min.js'
                    ]
                }, {
                    name: 'stepsForm',
                    files: [
                        'plugins/codrops-stepsform/css/component.css',
                        'plugins/codrops-stepsform/js/stepsForm.js'
                    ]
                }, {
                    name: 'jquery-ui',
                    files: ['plugins/jquery-ui-touch/jquery.ui.touch-punch.min.js']
                }, {
                    name: 'moment',
                    files: ['plugins/moment/moment.min.js',
                        'plugins/moment/moment-with-locales.min.js'
                    ]
                }, {
                    name: 'hammer',
                    files: ['plugins/hammer.min.js']
                }, {
                    name: 'sieve',
                    files: ['plugins/jquery.sieve.min.js']
                }, {
                    name: 'line-icons',
                    files: ['plugins/simple-line-icons/simple-line-icons.css']
                }, {
                    name: 'ionRangeSlider',
                    files: [
                        'plugins/ion-slider/css/ion.rangeSlider.css',
                        'plugins/ion-slider/css/ion.rangeSlider.skinFlat.css',
                        'plugins/ion-slider/js/ion.rangeSlider.min.js'
                    ]
                }, {
                    name: 'navTree',
                    files: [
                        'plugins/angular-bootstrap-nav-tree/abn_tree_directive.js',
                        'plugins/angular-bootstrap-nav-tree/abn_tree.css'
                    ]
                }, {
                    name: 'nestable',
                    files: [
                        'plugins/jquery-nestable/jquery.nestable.css',
                        'plugins/jquery-nestable/jquery.nestable.js',
                        'plugins/angular-nestable/angular-nestable.js'
                    ]
                }, {
                    //https://github.com/angular-ui/ui-select
                    name: 'select',
                    files: [
                        'plugins/bootstrap-select2/select2.css',
                        'plugins/angular-ui-select/select.min.css',
                        'plugins/angular-ui-select/select.min.js'
                    ]
                }, {
                    name: 'datepicker',
                    files: [
                        'plugins/bootstrap-datepicker/css/datepicker3.css',
                        'plugins/bootstrap-datepicker/js/bootstrap-datepicker.js',
                    ]
                }, {
                    name: 'daterangepicker',
                    files: [
                        'plugins/bootstrap-daterangepicker/daterangepicker-bs3.css',
                        'plugins/bootstrap-daterangepicker/daterangepicker.js'
                    ]
                }, {
                    name: 'timepicker',
                    files: [
                        'plugins/bootstrap-timepicker/bootstrap-timepicker.min.css',
                        'plugins/bootstrap-timepicker/bootstrap-timepicker.min.js'
                    ]
                }, {
                    name: 'inputMask',
                    files: [
                        'plugins/jquery-inputmask/jquery.inputmask.min.js'
                    ]
                }, {
                    name: 'autonumeric',
                    files: [
                        'plugins/jquery-autonumeric/autoNumeric.js'
                    ]
                }, {
                    name: 'summernote',
                    files: [
                        'plugins/summernote/css/summernote.css',
                        'plugins/summernote/js/summernote.min.js',
                        'plugins/angular-summernote/angular-summernote.min.js'
                    ],
                    serie: true // load in the exact order
                }, {
                    name: 'tagsInput',
                    files: [
                        'plugins/bootstrap-tag/bootstrap-tagsinput.css',
                        'plugins/bootstrap-tag/bootstrap-tagsinput.min.js'
                    ]
                }, {
                    name: 'dropzone',
                    files: [
                        'plugins/dropzone/css/dropzone.css',
                        'plugins/dropzone/dropzone.min.js',
                        'plugins/angular-dropzone/angular-dropzone.js'
                    ]
                }, {
                    name: 'wizard',
                    files: [
                        'plugins/lodash/lodash.min.js',
                        'plugins/angular-wizard/angular-wizard.min.css',
                        'plugins/angular-wizard/angular-wizard.min.js'
                    ]
                }, {
                    name: 'dataTables',
                    files: [
                        'plugins/jquery-datatable/media/css/jquery.dataTables.css',
                        'plugins/jquery-datatable/extensions/FixedColumns/css/dataTables.fixedColumns.min.css',
                        'plugins/datatables-responsive/css/datatables.responsive.css',
                        'plugins/jquery-datatable/media/js/jquery.dataTables.min.js',
                        'plugins/jquery-datatable/extensions/TableTools/js/dataTables.tableTools.min.js',
                        'plugins/jquery-datatable/extensions/Bootstrap/jquery-datatable-bootstrap.js',
                        'plugins/datatables-responsive/js/datatables.responsive.js',
                        'plugins/datatables-responsive/js/lodash.min.js'
                    ],
                    serie: true // load in the exact order
                }, {
                    name: 'google-map',
                    files: [
                        'plugins/angular-google-map-loader/google-map-loader.js',
                        'plugins/angular-google-map-loader/google-maps.js'
                    ]
                }, {
                    name: 'ammaps',
                    files: [
                        'components/ammap3/ammap/ammap.js',
                        'components/ammap3/ammap/themes/dark.js',
                        'components/ammap3/ammap/maps/js/continentsLow.js',
                        'components/ammap3/ammap/maps/js/worldLow.js'
                    ],
                    serie: true
                }
            ]
        });
    }]);
