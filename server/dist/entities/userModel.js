"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.BanInfo = exports.UserRole = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["MODERATOR"] = "moderator";
    UserRole["CUSTOMER"] = "customer";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
class BanInfo {
}
__decorate([
    (0, typeorm_1.Column)({
        default: false
    }),
    __metadata("design:type", Boolean)
], BanInfo.prototype, "baned", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BanInfo.prototype, "banReason", void 0);
exports.BanInfo = BanInfo;
////////////////////////////////////////////////////////////////////////////
let User = class User extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.MaxLength)(16),
    __metadata("design:type", String)
], User.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true,
        update: false
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "json",
        default: null
    }),
    __metadata("design:type", BanInfo)
], User.prototype, "ban", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: false
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], User.prototype, "activation", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: UserRole,
        default: UserRole.CUSTOMER
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
User = __decorate([
    (0, typeorm_1.Entity)('user')
], User);
exports.User = User;
/////////////////////////////////////////////////////////////////////
class SubIM {
}
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SubIM.prototype, "subi", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: UserRole,
        default: UserRole.CUSTOMER
    }),
    __metadata("design:type", String)
], SubIM.prototype, "subrole", void 0);
