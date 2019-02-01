(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/js/app"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/LoginForm.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/LoginForm.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      email: null,
      password: null,
      error: null
    };
  },
  methods: {
    submit: function submit() {
      var _this = this;

      axios.post('/api/login', {
        email: this.email,
        password: this.password
      }).then(function (response) {
        localStorage.setItem('token', JSON.stringify(response.data.token));
        localStorage.setItem('user', JSON.stringify(response.data.user));
        var user = JSON.parse(localStorage.user);

        if (user.role != 3) {
          return _this.$router.push({
            path: '/usuarios'
          });
        }

        _this.$router.push({
          path: "usuarios/".concat(user.id)
        });
      }).catch(function (error) {
        return _this.error = error.response.data.error;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Page404.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Page404.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/UserDeleteConfirmModal.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/UserDeleteConfirmModal.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['user'],
  computed: {
    canDeletePermanently: function canDeletePermanently() {
      return this.$root.isAdmin && this.user.id != JSON.parse(localStorage.user).id;
    }
  },
  methods: {
    deleteUser: function deleteUser() {
      var _this = this;

      var permanently = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      axios.delete("/api/v1/usuarios/".concat(this.user.id), {
        data: {
          delete_permanently: permanently
        },
        headers: {
          Authorization: "Bearer ".concat(JSON.parse(localStorage.token))
        }
      }).then(function () {
        if (_this.user.id == JSON.parse(localStorage.user).id) {
          _this.$root.logout();
        }

        _this.$router.push({
          path: '/usuarios'
        });
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/UsersCreateForm.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/UsersCreateForm.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      name: null,
      email: null,
      password: null,
      password_confirmation: null,
      role: 0,
      avatar: null,
      errors: {}
    };
  },
  computed: {
    formData: function formData() {
      var formData = new FormData();
      formData.append('name', this.name);
      formData.append('email', this.email);
      formData.append('role', this.role);
      formData.append('password', this.password);
      formData.append('password_confirmation', this.password_confirmation);
      formData.append('avatar', this.avatar);
      return formData;
    }
  },
  methods: {
    previewAvatar: function previewAvatar() {
      this.$refs.avatar.files[0].url = URL.createObjectURL(this.$refs.avatar.files[0]);
      this.avatar = this.$refs.avatar.files[0];
    },
    submit: function submit() {
      var _this = this;

      axios.post('/api/v1/usuarios', this.formData, {
        headers: {
          Authorization: "Bearer ".concat(JSON.parse(localStorage.token))
        }
      }).then(function (_ref) {
        var data = _ref.data;
        return _this.$router.push({
          path: "/usuarios/".concat(data.id)
        });
      }).catch(function (error) {
        return _this.errors = error.response.data.errors;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/UsersIndex.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/UsersIndex.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      users: [],
      page: 0
    };
  },
  mounted: function mounted() {
    var _this = this;

    axios.get('/api/v1/usuarios', {
      headers: {
        Authorization: "Bearer ".concat(JSON.parse(localStorage.token))
      }
    }).then(function (_ref) {
      var data = _ref.data;
      return _this.users = data;
    });
  },
  computed: {
    listUsers: function listUsers() {
      return this.users[this.page];
    }
  },
  methods: {
    isSoftDeleted: function isSoftDeleted(user) {
      return user.deleted_at ? 'filter: grayscale(100%); border-color: black' : '';
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/UsersShow.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/UsersShow.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserDeleteConfirmModal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserDeleteConfirmModal */ "./resources/js/components/UserDeleteConfirmModal.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    UserDeleteConfirmModal: _UserDeleteConfirmModal__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      user: {},
      name: null,
      email: null,
      role: null,
      edit: false,
      avatar: null,
      permanently: false,
      editPassword: false,
      password: null,
      password_confirmation: null
    };
  },
  watch: {
    edit: function edit() {
      if (!this.edit) {
        this.editPassword = false;
        this.avatar = null;
      }
    },
    editPassword: function editPassword() {
      this.password = null;
      this.password_confirmation = null;
    }
  },
  mounted: function mounted() {
    var _this = this;

    axios.get("/api/v1/usuarios/".concat(this.$route.params.user_id), {
      headers: {
        Authorization: "Bearer ".concat(JSON.parse(localStorage.token))
      }
    }).then(function (_ref) {
      var data = _ref.data;
      _this.user = data;
      _this.name = data.name;
      _this.email = data.email;
      _this.role = data.role;
    });
  },
  computed: {
    avatarRoute: function avatarRoute() {
      return this.avatar ? this.avatar.url : "/storage/avatars/".concat(this.user.avatar);
    },
    isDeletable: function isDeletable() {
      if (this.user.deleted_at && !this.$root.isAdmin) {
        return false;
      }

      return true;
    },
    formData: function formData() {
      var formData = new FormData();
      formData.append('_method', 'PUT');

      if (this.user.email != this.email) {
        formData.append('email', this.email);
      }

      if (this.password) {
        formData.append('password', this.password);
      }

      if (this.password_confirmation) {
        formData.append('password_confirmation', this.password_confirmation);
      }

      if (this.user.role != this.role) {
        formData.append('role', this.role);
      }

      if (this.user.name != this.name) {
        formData.append('name', this.name);
      }

      if (this.avatar) {
        formData.append('avatar', this.avatar);
      }

      return formData;
    }
  },
  methods: {
    restoreUser: function restoreUser() {
      var _this2 = this;

      axios.patch("/api/v1/usuarios/".concat(this.user.id, "/restaurar"), null, {
        headers: {
          Authorization: "Bearer ".concat(JSON.parse(localStorage.token))
        }
      }).then(function (_ref2) {
        var data = _ref2.data;
        return _this2.user = data;
      });
    },
    previewAvatar: function previewAvatar() {
      this.$refs.avatar.files[0].url = URL.createObjectURL(this.$refs.avatar.files[0]);
      this.avatar = this.$refs.avatar.files[0];
    },
    submit: function submit() {
      var _this3 = this;

      axios.post("/api/v1/usuarios/".concat(this.user.id), this.formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: "Bearer ".concat(JSON.parse(localStorage.token))
        }
      }).then(function (_ref3) {
        var data = _ref3.data;
        _this3.user = data;
        _this3.name = data.name;
        _this3.email = data.email;
        _this3.role = data.role;
        _this3.edit = false;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/LoginForm.vue?vue&type=template&id=12a98f72&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/LoginForm.vue?vue&type=template&id=12a98f72& ***!
  \************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "form",
    {
      staticClass: "card w-1/3",
      on: {
        submit: function($event) {
          $event.preventDefault()
          return _vm.submit($event)
        },
        input: function($event) {
          _vm.error = null
        }
      }
    },
    [
      _c("transition", { attrs: { name: "fade", appear: "" } }, [
        _vm.error
          ? _c("div", {
              staticClass:
                "bg-red-lighter text-red-darker text-lg p-2 mb-4 rounded shadow-sm",
              domProps: { textContent: _vm._s(_vm.error) }
            })
          : _vm._e()
      ]),
      _vm._v(" "),
      _vm._m(0),
      _vm._v(" "),
      _c("input", {
        directives: [
          {
            name: "model",
            rawName: "v-model",
            value: _vm.email,
            expression: "email"
          }
        ],
        staticClass: "form-input",
        attrs: {
          placeholder: "Correo Electrónico",
          type: "email",
          name: "email"
        },
        domProps: { value: _vm.email },
        on: {
          input: function($event) {
            if ($event.target.composing) {
              return
            }
            _vm.email = $event.target.value
          }
        }
      }),
      _vm._v(" "),
      _c("input", {
        directives: [
          {
            name: "model",
            rawName: "v-model",
            value: _vm.password,
            expression: "password"
          }
        ],
        staticClass: "form-input",
        attrs: {
          placeholder: "Contraseña",
          type: "password",
          name: "password"
        },
        domProps: { value: _vm.password },
        on: {
          input: function($event) {
            if ($event.target.composing) {
              return
            }
            _vm.password = $event.target.value
          }
        }
      }),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass:
            "py-2 hover:shadow w-1/2 text-sm ml-auto bg-blue-dark text-white uppercase rounded-full mt-auto"
        },
        [_vm._v("Iniciar Sesión")]
      )
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "mb-4 flex justify-center items-center" }, [
      _c("img", {
        staticClass: "w-1/2 h-auto",
        attrs: {
          src: "http://macasoft.com/assets/img/logo.png",
          alt: "Macasoft"
        }
      })
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Page404.vue?vue&type=template&id=4270052e&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Page404.vue?vue&type=template&id=4270052e&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "card" }, [
    _vm._v("\n    La página que buscas no existe.\n    "),
    _c(
      "button",
      {
        staticClass: "btn mt-4 w-1/3 ml-auto",
        on: {
          click: function($event) {
            $event.preventDefault()
            _vm.$router.push("/")
          }
        }
      },
      [_vm._v("Volver")]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/UserDeleteConfirmModal.vue?vue&type=template&id=35087224&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/UserDeleteConfirmModal.vue?vue&type=template&id=35087224&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "modal",
    { attrs: { name: "user-confirm-delete", height: "250px", width: "350px" } },
    [
      _c("div", { staticClass: "flex flex-col p-4 h-full items-center" }, [
        _c("p", [_vm._v("¿estás seguro de eliminar la cuenta?")]),
        _vm._v(" "),
        _c("div", { staticClass: "flex flex-col justify-around flex-1" }, [
          !_vm.user.deleted_at
            ? _c(
                "button",
                {
                  staticClass: "btn",
                  on: {
                    click: function($event) {
                      $event.preventDefault()
                      _vm.deleteUser()
                    }
                  }
                },
                [
                  _vm._v(
                    "\n                Eliminar Temporalmente\n            "
                  )
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.canDeletePermanently
            ? _c(
                "button",
                {
                  staticClass:
                    "btn bg-white text-red-dark hover:shadow-none font-bold",
                  on: {
                    click: function($event) {
                      $event.preventDefault()
                      _vm.deleteUser(true)
                    }
                  }
                },
                [
                  _vm._v(
                    "\n                Eliminar Permanentemente\n            "
                  )
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _c(
            "button",
            {
              staticClass:
                "btn bg-white text-grey-darker hover:shadow-none font-bold",
              on: {
                click: function($event) {
                  $event.preventDefault()
                  _vm.$modal.hide("user-confirm-delete")
                }
              }
            },
            [_vm._v("\n                Cancelar\n            ")]
          )
        ])
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/UsersCreateForm.vue?vue&type=template&id=9234e726&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/UsersCreateForm.vue?vue&type=template&id=9234e726&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "form",
    {
      staticClass: "card",
      on: {
        submit: function($event) {
          $event.preventDefault()
          return _vm.submit($event)
        },
        input: function($event) {
          _vm.errors = {}
        }
      }
    },
    [
      _c("h2", { staticClass: "pb-4 flex justify-between items-center" }, [
        _vm._v("\n        Nuevo Usuario\n\n    ")
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "flex -mx-2" }, [
        _c(
          "div",
          { staticClass: "w-1/2 px-2" },
          [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.name,
                  expression: "name"
                }
              ],
              staticClass: "form-input",
              attrs: { placeholder: "Nombre", type: "text", name: "name" },
              domProps: { value: _vm.name },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.name = $event.target.value
                }
              }
            }),
            _vm._v(" "),
            _vm._l(_vm.errors.name, function(error) {
              return _c("small", { domProps: { textContent: _vm._s(error) } })
            })
          ],
          2
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "w-1/2 px-2" },
          [
            _c(
              "select",
              {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.role,
                    expression: "role"
                  }
                ],
                staticClass: "form-input",
                attrs: { name: "role", id: "role" },
                on: {
                  change: function($event) {
                    var $$selectedVal = Array.prototype.filter
                      .call($event.target.options, function(o) {
                        return o.selected
                      })
                      .map(function(o) {
                        var val = "_value" in o ? o._value : o.value
                        return val
                      })
                    _vm.role = $event.target.multiple
                      ? $$selectedVal
                      : $$selectedVal[0]
                  }
                }
              },
              [
                _c("option", { attrs: { value: "0", disabled: "" } }, [
                  _vm._v("Rol")
                ]),
                _vm._v(" "),
                _c("option", { attrs: { value: "1" } }, [
                  _vm._v("Administrador")
                ]),
                _vm._v(" "),
                _c("option", { attrs: { value: "2" } }, [_vm._v("Vendedor")]),
                _vm._v(" "),
                _c("option", { attrs: { value: "3" } }, [_vm._v("Usuario")])
              ]
            ),
            _vm._v(" "),
            _vm._l(_vm.errors.role, function(error) {
              return _c("small", { domProps: { textContent: _vm._s(error) } })
            })
          ],
          2
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "flex -mx-2" }, [
        _c("div", { staticClass: "w-1/2 px-2 flex justify-center" }, [
          _c(
            "div",
            {
              staticClass:
                "rounded-full h-48 w-48 border-blue-dark border-2 flex justify-center items-center overflow-hidden"
            },
            [
              _c(
                "transition",
                { attrs: { name: "fade", mode: "out-in" } },
                [
                  !_vm.avatar
                    ? _c("div", [
                        _c(
                          "label",
                          {
                            staticClass:
                              "cursor-pointer font-bold text-blue-dark text-sm hover:underline text-center inline-block",
                            attrs: { for: "avatar" }
                          },
                          [
                            _vm._v("\n                            Agregar"),
                            _c("br"),
                            _vm._v("Foto de Perfil\n                        ")
                          ]
                        ),
                        _vm._v(" "),
                        _c("input", {
                          ref: "avatar",
                          staticClass: "hidden",
                          attrs: {
                            type: "file",
                            accept: "image/*",
                            id: "avatar",
                            name: "avatar"
                          },
                          on: { change: _vm.previewAvatar }
                        })
                      ])
                    : _c("img", {
                        staticClass: "w-auto h-full",
                        attrs: { src: _vm.avatar.url, alt: "avatar" }
                      }),
                  _vm._v(" "),
                  _vm._l(_vm.errors.avatar, function(error) {
                    return _c("small", {
                      domProps: { textContent: _vm._s(error) }
                    })
                  })
                ],
                2
              )
            ],
            1
          )
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "w-1/2 px-2" },
          [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.email,
                  expression: "email"
                }
              ],
              staticClass: "form-input",
              attrs: {
                placeholder: "Correo Electrónico",
                type: "email",
                name: "email"
              },
              domProps: { value: _vm.email },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.email = $event.target.value
                }
              }
            }),
            _vm._v(" "),
            _vm._l(_vm.errors.email, function(error) {
              return _c("small", { domProps: { textContent: _vm._s(error) } })
            }),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.password,
                  expression: "password"
                }
              ],
              staticClass: "form-input",
              attrs: {
                placeholder: "Contraseña",
                type: "password",
                name: "password"
              },
              domProps: { value: _vm.password },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.password = $event.target.value
                }
              }
            }),
            _vm._v(" "),
            _vm._l(_vm.errors.password, function(error) {
              return _c("small", { domProps: { textContent: _vm._s(error) } })
            }),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.password_confirmation,
                  expression: "password_confirmation"
                }
              ],
              staticClass: "form-input",
              attrs: {
                placeholder: "Confirmar Contraseña",
                type: "password",
                name: "password_confirmation"
              },
              domProps: { value: _vm.password_confirmation },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.password_confirmation = $event.target.value
                }
              }
            })
          ],
          2
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "w-full flex justify-between" }, [
        _c(
          "button",
          {
            staticClass:
              "focus:outline-none rounded-full py-2 px-4 text-sm text-grey-darker uppercase mt-auto",
            attrs: { type: "button" },
            on: {
              click: function($event) {
                $event.preventDefault()
                _vm.$router.push({ path: "/usuarios" })
              }
            }
          },
          [_vm._v("Cancelar")]
        ),
        _vm._v(" "),
        _c("button", { staticClass: "btn mt-auto" }, [_vm._v("Registrar")])
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/UsersIndex.vue?vue&type=template&id=4616f755&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/UsersIndex.vue?vue&type=template&id=4616f755&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "card" }, [
    _c("h2", { staticClass: "p-4 flex justify-between items-center" }, [
      _vm._v("\n        Usuarios\n        "),
      _vm.$root.isAdmin
        ? _c(
            "button",
            {
              staticClass: "btn",
              on: {
                click: function($event) {
                  $event.preventDefault()
                  _vm.$router.push({ path: "/usuarios/nuevo" })
                }
              }
            },
            [_vm._v("Nuevo Usuario")]
          )
        : _vm._e()
    ]),
    _vm._v(" "),
    _c("div", [
      _c("table", { staticClass: "w-full" }, [
        _c(
          "tbody",
          _vm._l(_vm.listUsers, function(user) {
            return _c(
              "tr",
              { key: user.id, class: user.deleted_at ? "bg-grey-light" : "" },
              [
                _c(
                  "td",
                  { staticClass: "flex justify-center items-center px-2" },
                  [
                    _c(
                      "div",
                      {
                        staticClass:
                          "rounded-full h-12 w-12 my-2 overflow-hidden border-2 border-blue-dark",
                        style: _vm.isSoftDeleted(user)
                      },
                      [
                        _c("img", {
                          staticClass: "h-full w-auto",
                          attrs: {
                            src: "/storage/avatars/" + user.avatar,
                            alt: ""
                          }
                        })
                      ]
                    )
                  ]
                ),
                _vm._v(" "),
                _c("td", { staticClass: "w-1/2 px-2" }, [
                  _c(
                    "a",
                    {
                      staticClass: "text-blue-dark no-underline",
                      attrs: { href: "#" },
                      on: {
                        click: function($event) {
                          $event.preventDefault()
                          _vm.$router.push("/usuarios/" + user.id)
                        }
                      }
                    },
                    [
                      _c(
                        "span",
                        { staticClass: "font-bold underline text-sm" },
                        [
                          _vm._v(
                            _vm._s(user.name) +
                              " " +
                              _vm._s(user.deleted_at ? "(eliminado)" : "")
                          )
                        ]
                      ),
                      _c("br"),
                      _vm._v(" "),
                      _c(
                        "span",
                        { staticClass: "uppercase text-xs text-grey-darker" },
                        [_vm._v(_vm._s(_vm.$root.role(user.role)))]
                      )
                    ]
                  )
                ]),
                _vm._v(" "),
                _c("td", { staticClass: "px-2 text-sm" }, [
                  _vm._v(_vm._s(user.email))
                ])
              ]
            )
          }),
          0
        )
      ]),
      _vm._v(" "),
      _vm.users.length > 1
        ? _c(
            "div",
            { staticClass: "p-4" },
            _vm._l(_vm.users, function(user, index) {
              return _c("button", {
                key: "user" + index,
                staticClass:
                  "cursor-pointer focus:outline-none py-2 px-4 hover:bg-blue-dark hover:text-white border-t-2 border-blue-dark",
                class: index === _vm.page ? "bg-blue-dark text-white" : "",
                domProps: { textContent: _vm._s(index + 1) },
                on: {
                  click: function($event) {
                    $event.preventDefault()
                    _vm.page = index
                  }
                }
              })
            }),
            0
          )
        : _vm._e()
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/UsersShow.vue?vue&type=template&id=9481ae6c&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/UsersShow.vue?vue&type=template&id=9481ae6c&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "card" },
    [
      _c("h2", { staticClass: "p-4 flex justify-between items-center" }, [
        !_vm.edit
          ? _c("span", [_vm._v(_vm._s(_vm.name))])
          : _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.name,
                  expression: "name"
                }
              ],
              staticClass: "form-input text-base w-3/4 mb-0",
              attrs: { type: "text" },
              domProps: { value: _vm.name },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.name = $event.target.value
                }
              }
            }),
        _vm._v(" "),
        _c("div", [
          !_vm.user.deleted_at
            ? _c(
                "button",
                {
                  staticClass: "btn",
                  class: _vm.edit
                    ? "bg-transparent text-grey-dark hover:shadow-none"
                    : "",
                  on: {
                    click: function($event) {
                      $event.preventDefault()
                      _vm.edit = !_vm.edit
                    }
                  }
                },
                [
                  _vm._v(
                    "\n                " +
                      _vm._s(_vm.edit ? "Cancelar" : "Editar") +
                      "\n            "
                  )
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.user.deleted_at && _vm.$root.isAdmin
            ? _c(
                "button",
                {
                  staticClass: "text-green-dark text-xs",
                  on: {
                    click: function($event) {
                      $event.preventDefault()
                      return _vm.restoreUser($event)
                    }
                  }
                },
                [_vm._v("\n                Restaurar\n            ")]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.isDeletable
            ? _c(
                "button",
                {
                  staticClass: "text-red-dark text-xs",
                  on: {
                    click: function($event) {
                      $event.preventDefault()
                      _vm.$modal.show("user-confirm-delete")
                    }
                  }
                },
                [_vm._v("\n                Eliminar\n            ")]
              )
            : _vm._e()
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "p-4" }, [
        _c("div", { staticClass: "flex" }, [
          _c("div", { staticClass: "w-1/2" }, [
            _vm.user.avatar
              ? _c(
                  "div",
                  {
                    staticClass:
                      "rounded-full w-48 border-2 border-blue-dark h-48 bg-center bg-contain overflow-hidden",
                    style: "background-image: url(" + _vm.avatarRoute + ")"
                  },
                  [
                    _vm.edit
                      ? _c(
                          "div",
                          {
                            staticClass:
                              "h-full w-full flex items-center underline font-bold justify-center uppercase text-xs text-white",
                            staticStyle: { "background-color": "#2779bd47" }
                          },
                          [
                            _c(
                              "label",
                              {
                                staticClass: "cursor-pointer",
                                attrs: { for: "avatar" }
                              },
                              [_vm._v("Cambiar Foto de Perfil")]
                            ),
                            _vm._v(" "),
                            _c("input", {
                              ref: "avatar",
                              staticClass: "hidden",
                              attrs: {
                                type: "file",
                                accept: "image/*",
                                id: "avatar"
                              },
                              on: { change: _vm.previewAvatar }
                            })
                          ]
                        )
                      : _vm._e()
                  ]
                )
              : _vm._e()
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "w-1/2 flex items-center justify-center flex-col" },
            [
              !_vm.edit
                ? _c("div", {
                    staticClass: "uppercase",
                    domProps: { textContent: _vm._s(_vm.$root.role(_vm.role)) }
                  })
                : _c(
                    "select",
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.role,
                          expression: "role"
                        }
                      ],
                      staticClass: "form-input",
                      on: {
                        change: function($event) {
                          var $$selectedVal = Array.prototype.filter
                            .call($event.target.options, function(o) {
                              return o.selected
                            })
                            .map(function(o) {
                              var val = "_value" in o ? o._value : o.value
                              return val
                            })
                          _vm.role = $event.target.multiple
                            ? $$selectedVal
                            : $$selectedVal[0]
                        }
                      }
                    },
                    [
                      _c("option", { attrs: { value: "1" } }, [
                        _vm._v("Administrador")
                      ]),
                      _vm._v(" "),
                      _c("option", { attrs: { value: "2" } }, [
                        _vm._v("Vendedor")
                      ]),
                      _vm._v(" "),
                      _c("option", { attrs: { value: "3" } }, [
                        _vm._v("Usuario")
                      ])
                    ]
                  ),
              _vm._v(" "),
              !_vm.edit
                ? _c("div", {
                    staticClass: "font-bold mt-8",
                    domProps: { textContent: _vm._s(_vm.email) }
                  })
                : _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.email,
                        expression: "email"
                      }
                    ],
                    staticClass: "form-input",
                    attrs: { type: "text" },
                    domProps: { value: _vm.email },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.email = $event.target.value
                      }
                    }
                  }),
              _vm._v(" "),
              _vm.edit
                ? _c("div", { staticClass: "w-full -mt-2" }, [
                    _c(
                      "a",
                      {
                        staticClass:
                          "font-bold mb-4 text-xs inline-block self-start text-blue-dark",
                        attrs: { href: "#" },
                        on: {
                          click: function($event) {
                            $event.preventDefault()
                            _vm.editPassword = !_vm.editPassword
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n                        " +
                            _vm._s(
                              _vm.editPassword
                                ? "Cancelar Edición de"
                                : "Editar"
                            ) +
                            " Contraseña\n                    "
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _vm.editPassword
                      ? _c("div", [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.password,
                                expression: "password"
                              }
                            ],
                            staticClass: "form-input",
                            attrs: {
                              placeholder: "Contraseña",
                              type: "password"
                            },
                            domProps: { value: _vm.password },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.password = $event.target.value
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.password_confirmation,
                                expression: "password_confirmation"
                              }
                            ],
                            staticClass: "form-input",
                            attrs: {
                              placeholder: "Confirmar Contraseña",
                              type: "password"
                            },
                            domProps: { value: _vm.password_confirmation },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.password_confirmation = $event.target.value
                              }
                            }
                          })
                        ])
                      : _vm._e()
                  ])
                : _vm._e(),
              _vm._v(" "),
              _vm.edit
                ? _c(
                    "button",
                    {
                      staticClass: "btn ml-auto",
                      on: {
                        click: function($event) {
                          $event.preventDefault()
                          return _vm.submit($event)
                        }
                      }
                    },
                    [_vm._v("Guardar Cambios")]
                  )
                : _vm._e()
            ]
          )
        ])
      ]),
      _vm._v(" "),
      _c("user-delete-confirm-modal", { attrs: { user: _vm.user } })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-router */ "./node_modules/vue-router/dist/vue-router.esm.js");
/* harmony import */ var vue_js_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-js-modal */ "./node_modules/vue-js-modal/dist/index.js");
/* harmony import */ var vue_js_modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_js_modal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Page404__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Page404 */ "./resources/js/components/Page404.vue");
/* harmony import */ var _components_LoginForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/LoginForm */ "./resources/js/components/LoginForm.vue");
/* harmony import */ var _components_UsersShow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/UsersShow */ "./resources/js/components/UsersShow.vue");
/* harmony import */ var _components_UsersIndex__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/UsersIndex */ "./resources/js/components/UsersIndex.vue");
/* harmony import */ var _components_UsersCreateForm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/UsersCreateForm */ "./resources/js/components/UsersCreateForm.vue");
__webpack_require__(/*! ./bootstrap */ "./resources/js/bootstrap.js");

window.Vue = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");


Vue.use(vue_router__WEBPACK_IMPORTED_MODULE_0__["default"]);
Vue.use(vue_js_modal__WEBPACK_IMPORTED_MODULE_1___default.a);





var routes = [{
  path: '/login',
  component: _components_LoginForm__WEBPACK_IMPORTED_MODULE_3__["default"]
}, {
  path: '/usuarios',
  component: _components_UsersIndex__WEBPACK_IMPORTED_MODULE_5__["default"],
  meta: {
    authenticated: true
  }
}, {
  path: '/usuarios/nuevo',
  component: _components_UsersCreateForm__WEBPACK_IMPORTED_MODULE_6__["default"],
  meta: {
    authenticated: true
  }
}, {
  path: '/usuarios/:user_id',
  component: _components_UsersShow__WEBPACK_IMPORTED_MODULE_4__["default"],
  meta: {
    authenticated: true
  }
}, {
  path: '*',
  component: _components_Page404__WEBPACK_IMPORTED_MODULE_2__["default"]
}];
var router = new vue_router__WEBPACK_IMPORTED_MODULE_0__["default"]({
  routes: routes
});
router.beforeEach(function (to, from, next) {
  var token = localStorage.token;
  var user = localStorage.user;

  if (to.meta.authenticated && !token) {
    return next({
      path: '/login'
    });
  }

  if (to.path == '/') {
    if (!token) {
      return next({
        path: '/login'
      });
    }

    if (token && JSON.parse(user).role !== 3) {
      return next({
        path: '/usuarios'
      });
    }

    if (token && JSON.parse(user).role === 3) {
      return next({
        path: "/usuarios/".concat(JSON.parse(user).id)
      });
    }
  }

  if (to.path == '/pagina-no-encontrada') {
    return next();
  }

  if (to.path == '/login') {
    if (token && JSON.parse(user).role !== 3) {
      return next({
        path: '/usuarios'
      });
    }

    if (token && JSON.parse(user).role === 3) {
      return next({
        path: "/usuarios/".concat(JSON.parse(user).id)
      });
    }

    return next();
  }

  if (to.path == '/usuarios') {
    if (token && JSON.parse(user).role === 3) {
      return next({
        path: '/pagina-no-encontrada'
      });
    }

    return next();
  }

  if (to.path == '/usuarios/nuevo') {
    if (token && JSON.parse(user).role === 1) {
      return next();
    }

    return next({
      path: '/pagina-no-encontrada'
    });
  }

  if (to.params.user_id != JSON.parse(user).id && JSON.parse(user).role == 3) {
    return next({
      path: '/pagina-no-encontrada'
    });
  }

  return next();
});
var app = new Vue({
  router: router,
  computed: {
    isAdmin: function isAdmin() {
      return JSON.parse(localStorage.user).role == 1;
    },
    isAuthenticated: function isAuthenticated() {
      return localStorage.getItem('token');
    }
  },
  methods: {
    role: function role(_role) {
      if (_role === 1) {
        return 'administrador';
      }

      if (_role === 2) {
        return 'vendedor';
      }

      return 'usuario';
    },
    logout: function logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.$router.push('/login');
    }
  }
}).$mount('#app');

/***/ }),

/***/ "./resources/js/bootstrap.js":
/*!***********************************!*\
  !*** ./resources/js/bootstrap.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// window._ = require('lodash');
window.axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
var token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
  window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
  console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

/***/ }),

/***/ "./resources/js/components/LoginForm.vue":
/*!***********************************************!*\
  !*** ./resources/js/components/LoginForm.vue ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LoginForm_vue_vue_type_template_id_12a98f72___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LoginForm.vue?vue&type=template&id=12a98f72& */ "./resources/js/components/LoginForm.vue?vue&type=template&id=12a98f72&");
/* harmony import */ var _LoginForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LoginForm.vue?vue&type=script&lang=js& */ "./resources/js/components/LoginForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _LoginForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _LoginForm_vue_vue_type_template_id_12a98f72___WEBPACK_IMPORTED_MODULE_0__["render"],
  _LoginForm_vue_vue_type_template_id_12a98f72___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/LoginForm.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/LoginForm.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./resources/js/components/LoginForm.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./LoginForm.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/LoginForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/LoginForm.vue?vue&type=template&id=12a98f72&":
/*!******************************************************************************!*\
  !*** ./resources/js/components/LoginForm.vue?vue&type=template&id=12a98f72& ***!
  \******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginForm_vue_vue_type_template_id_12a98f72___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./LoginForm.vue?vue&type=template&id=12a98f72& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/LoginForm.vue?vue&type=template&id=12a98f72&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginForm_vue_vue_type_template_id_12a98f72___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginForm_vue_vue_type_template_id_12a98f72___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Page404.vue":
/*!*********************************************!*\
  !*** ./resources/js/components/Page404.vue ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Page404_vue_vue_type_template_id_4270052e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Page404.vue?vue&type=template&id=4270052e&scoped=true& */ "./resources/js/components/Page404.vue?vue&type=template&id=4270052e&scoped=true&");
/* harmony import */ var _Page404_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Page404.vue?vue&type=script&lang=js& */ "./resources/js/components/Page404.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Page404_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Page404_vue_vue_type_template_id_4270052e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Page404_vue_vue_type_template_id_4270052e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "4270052e",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Page404.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Page404.vue?vue&type=script&lang=js&":
/*!**********************************************************************!*\
  !*** ./resources/js/components/Page404.vue?vue&type=script&lang=js& ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Page404_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Page404.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Page404.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Page404_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Page404.vue?vue&type=template&id=4270052e&scoped=true&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/Page404.vue?vue&type=template&id=4270052e&scoped=true& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Page404_vue_vue_type_template_id_4270052e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Page404.vue?vue&type=template&id=4270052e&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Page404.vue?vue&type=template&id=4270052e&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Page404_vue_vue_type_template_id_4270052e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Page404_vue_vue_type_template_id_4270052e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/UserDeleteConfirmModal.vue":
/*!************************************************************!*\
  !*** ./resources/js/components/UserDeleteConfirmModal.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserDeleteConfirmModal_vue_vue_type_template_id_35087224_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserDeleteConfirmModal.vue?vue&type=template&id=35087224&scoped=true& */ "./resources/js/components/UserDeleteConfirmModal.vue?vue&type=template&id=35087224&scoped=true&");
/* harmony import */ var _UserDeleteConfirmModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserDeleteConfirmModal.vue?vue&type=script&lang=js& */ "./resources/js/components/UserDeleteConfirmModal.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _UserDeleteConfirmModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UserDeleteConfirmModal_vue_vue_type_template_id_35087224_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UserDeleteConfirmModal_vue_vue_type_template_id_35087224_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "35087224",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/UserDeleteConfirmModal.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/UserDeleteConfirmModal.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/UserDeleteConfirmModal.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserDeleteConfirmModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./UserDeleteConfirmModal.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/UserDeleteConfirmModal.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserDeleteConfirmModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/UserDeleteConfirmModal.vue?vue&type=template&id=35087224&scoped=true&":
/*!*******************************************************************************************************!*\
  !*** ./resources/js/components/UserDeleteConfirmModal.vue?vue&type=template&id=35087224&scoped=true& ***!
  \*******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserDeleteConfirmModal_vue_vue_type_template_id_35087224_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./UserDeleteConfirmModal.vue?vue&type=template&id=35087224&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/UserDeleteConfirmModal.vue?vue&type=template&id=35087224&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserDeleteConfirmModal_vue_vue_type_template_id_35087224_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserDeleteConfirmModal_vue_vue_type_template_id_35087224_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/UsersCreateForm.vue":
/*!*****************************************************!*\
  !*** ./resources/js/components/UsersCreateForm.vue ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UsersCreateForm_vue_vue_type_template_id_9234e726_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UsersCreateForm.vue?vue&type=template&id=9234e726&scoped=true& */ "./resources/js/components/UsersCreateForm.vue?vue&type=template&id=9234e726&scoped=true&");
/* harmony import */ var _UsersCreateForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UsersCreateForm.vue?vue&type=script&lang=js& */ "./resources/js/components/UsersCreateForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _UsersCreateForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UsersCreateForm_vue_vue_type_template_id_9234e726_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UsersCreateForm_vue_vue_type_template_id_9234e726_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "9234e726",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/UsersCreateForm.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/UsersCreateForm.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/js/components/UsersCreateForm.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UsersCreateForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./UsersCreateForm.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/UsersCreateForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UsersCreateForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/UsersCreateForm.vue?vue&type=template&id=9234e726&scoped=true&":
/*!************************************************************************************************!*\
  !*** ./resources/js/components/UsersCreateForm.vue?vue&type=template&id=9234e726&scoped=true& ***!
  \************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UsersCreateForm_vue_vue_type_template_id_9234e726_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./UsersCreateForm.vue?vue&type=template&id=9234e726&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/UsersCreateForm.vue?vue&type=template&id=9234e726&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UsersCreateForm_vue_vue_type_template_id_9234e726_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UsersCreateForm_vue_vue_type_template_id_9234e726_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/UsersIndex.vue":
/*!************************************************!*\
  !*** ./resources/js/components/UsersIndex.vue ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UsersIndex_vue_vue_type_template_id_4616f755_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UsersIndex.vue?vue&type=template&id=4616f755&scoped=true& */ "./resources/js/components/UsersIndex.vue?vue&type=template&id=4616f755&scoped=true&");
/* harmony import */ var _UsersIndex_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UsersIndex.vue?vue&type=script&lang=js& */ "./resources/js/components/UsersIndex.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _UsersIndex_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UsersIndex_vue_vue_type_template_id_4616f755_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UsersIndex_vue_vue_type_template_id_4616f755_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "4616f755",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/UsersIndex.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/UsersIndex.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/js/components/UsersIndex.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UsersIndex_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./UsersIndex.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/UsersIndex.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UsersIndex_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/UsersIndex.vue?vue&type=template&id=4616f755&scoped=true&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/UsersIndex.vue?vue&type=template&id=4616f755&scoped=true& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UsersIndex_vue_vue_type_template_id_4616f755_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./UsersIndex.vue?vue&type=template&id=4616f755&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/UsersIndex.vue?vue&type=template&id=4616f755&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UsersIndex_vue_vue_type_template_id_4616f755_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UsersIndex_vue_vue_type_template_id_4616f755_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/UsersShow.vue":
/*!***********************************************!*\
  !*** ./resources/js/components/UsersShow.vue ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UsersShow_vue_vue_type_template_id_9481ae6c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UsersShow.vue?vue&type=template&id=9481ae6c&scoped=true& */ "./resources/js/components/UsersShow.vue?vue&type=template&id=9481ae6c&scoped=true&");
/* harmony import */ var _UsersShow_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UsersShow.vue?vue&type=script&lang=js& */ "./resources/js/components/UsersShow.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _UsersShow_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UsersShow_vue_vue_type_template_id_9481ae6c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UsersShow_vue_vue_type_template_id_9481ae6c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "9481ae6c",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/UsersShow.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/UsersShow.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./resources/js/components/UsersShow.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UsersShow_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./UsersShow.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/UsersShow.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UsersShow_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/UsersShow.vue?vue&type=template&id=9481ae6c&scoped=true&":
/*!******************************************************************************************!*\
  !*** ./resources/js/components/UsersShow.vue?vue&type=template&id=9481ae6c&scoped=true& ***!
  \******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UsersShow_vue_vue_type_template_id_9481ae6c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./UsersShow.vue?vue&type=template&id=9481ae6c&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/UsersShow.vue?vue&type=template&id=9481ae6c&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UsersShow_vue_vue_type_template_id_9481ae6c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UsersShow_vue_vue_type_template_id_9481ae6c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/sass/app.scss":
/*!*********************************!*\
  !*** ./resources/sass/app.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*************************************************************!*\
  !*** multi ./resources/js/app.js ./resources/sass/app.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/alejandromedina/laravel/macasoft/resources/js/app.js */"./resources/js/app.js");
module.exports = __webpack_require__(/*! /Users/alejandromedina/laravel/macasoft/resources/sass/app.scss */"./resources/sass/app.scss");


/***/ })

},[[0,"/js/manifest","/js/vendor"]]]);